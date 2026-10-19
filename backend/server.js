const express = require("express");
const crypto = require("node:crypto");
const path = require("node:path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const PORT = process.env.PORT || 3001;

const ORIGEN_PERMITIDO = "https://panquesito2308.github.io";

const TIEMPO_AUTORIZACION = 10 * 60 * 1000;
const TIEMPO_SESION = 60 * 60 * 1000;

const autorizacionesPendientes = new Map();
const sesiones = new Map();
const intercambios = new Map();

// ==================================================
// CONFIGURACIÓN GENERAL
// ==================================================

app.use(express.json({ limit: "16kb" }));

// CORS para el callback publicado en GitHub Pages.
app.use((req, res, next) => {
  if (req.path !== "/auth/tiktok/callback") {
    return next();
  }

  const origin = req.headers.origin;

  res.setHeader("Vary", "Origin");

  if (origin !== ORIGEN_PERMITIDO) {
    return res.status(403).json({
      ok: false,
      error: "Origen no permitido.",
    });
  }

  res.setHeader("Access-Control-Allow-Origin", ORIGEN_PERMITIDO);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ==================================================
// FUNCIONES AUXILIARES
// ==================================================

function generarToken() {
  return crypto.randomBytes(32).toString("hex");
}

function esTokenValido(valor) {
  return typeof valor === "string" && /^[a-f0-9]{64}$/.test(valor);
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function limpiarExpirados() {
  const ahora = Date.now();

  for (const [state, datos] of autorizacionesPendientes) {
    if (ahora - datos.createdAt > TIEMPO_AUTORIZACION) {
      autorizacionesPendientes.delete(state);
    }
  }

  for (const [id, sesion] of sesiones) {
    if (ahora >= sesion.expiresAt) {
      sesiones.delete(id);
    }
  }

  for (const [state, intercambio] of intercambios) {
    if (ahora - intercambio.createdAt > TIEMPO_AUTORIZACION) {
      intercambios.delete(state);
    }
  }
}

function obtenerSesion(req) {
  const authorization = req.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    return null;
  }

  const token = authorization.slice(7);

  if (!esTokenValido(token)) {
    return null;
  }

  const sesion = sesiones.get(hashToken(token));

  if (!sesion || Date.now() >= sesion.expiresAt) {
    return null;
  }

  return sesion;
}

// ==================================================
// ESTADO DEL SERVIDOR
// ==================================================

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "TikTok auth backend",
  });
});

app.get("/auth/tiktok/status", (req, res) => {
  const variables = [
    "TIKTOK_CLIENT_KEY",
    "TIKTOK_CLIENT_SECRET",
    "TIKTOK_REDIRECT_URI",
  ];

  const missing = variables.filter((variable) => !process.env[variable]);

  res.json({
    ok: true,
    configured: missing.length === 0,
    missing,
  });
});

// ==================================================
// INICIAR AUTORIZACIÓN
// ==================================================
//
// La aplicación genera un secreto aleatorio y
// envía únicamente su hash SHA-256 al backend.
//
// El secreto original permanece en Expo Go.

app.post("/auth/tiktok/start", (req, res) => {
  const { TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI } =
    process.env;

  if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET || !TIKTOK_REDIRECT_URI) {
    return res.status(500).json({
      ok: false,
      error: "Faltan variables de TikTok.",
    });
  }

  const { challenge } = req.body || {};

  if (!esTokenValido(challenge)) {
    return res.status(400).json({
      ok: false,
      error: "Falta el challenge de la aplicación.",
    });
  }

  limpiarExpirados();

  const state = generarToken();

  autorizacionesPendientes.set(state, {
    challenge,
    createdAt: Date.now(),
  });

  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");

  url.searchParams.set("client_key", TIKTOK_CLIENT_KEY);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "user.info.basic");
  url.searchParams.set("redirect_uri", TIKTOK_REDIRECT_URI);
  url.searchParams.set("state", state);

  return res.json({
    ok: true,
    state,
    authorizationUrl: url.toString(),
  });
});

// ==================================================
// VERIFICAR RESPUESTA DE TIKTOK
// ==================================================

app.post("/auth/tiktok/callback", async (req, res) => {
  const { code, state, error } = req.body || {};

  if (error) {
    return res.status(400).json({
      ok: false,
      error: "TikTok rechazó o canceló la autorización.",
    });
  }

  if (
    typeof code !== "string" ||
    code.length === 0 ||
    code.length > 4096 ||
    !esTokenValido(state)
  ) {
    return res.status(400).json({
      ok: false,
      error: "Respuesta de autorización incompleta o no válida.",
    });
  }

  const autorizacion = autorizacionesPendientes.get(state);

  if (!autorizacion) {
    return res.status(400).json({
      ok: false,
      error: "Autorización inexistente o ya utilizada.",
    });
  }

  if (Date.now() - autorizacion.createdAt > TIEMPO_AUTORIZACION) {
    autorizacionesPendientes.delete(state);

    return res.status(400).json({
      ok: false,
      error: "La autorización expiró.",
    });
  }

  // Consumir el state antes de comunicarnos con TikTok.
  // Así no puede reutilizarse simultáneamente.
  autorizacionesPendientes.delete(state);

  const { TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI } =
    process.env;

  if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET || !TIKTOK_REDIRECT_URI) {
    return res.status(500).json({
      ok: false,
      error: "Configuración de TikTok incompleta.",
    });
  }

  try {
    const parametros = new URLSearchParams({
      client_key: TIKTOK_CLIENT_KEY,
      client_secret: TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: TIKTOK_REDIRECT_URI,
    });

    const respuesta = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: parametros.toString(),
        signal: AbortSignal.timeout(15000),
      },
    );

    const datos = await respuesta.json();

    if (!respuesta.ok || !datos.access_token || !datos.open_id) {
      console.error("Error de autorización de TikTok:", {
        status: respuesta.status,
        error: datos.error,
        description: datos.error_description,
      });

      return res.status(400).json({
        ok: false,
        error: "TikTok no pudo verificar la autorización.",
      });
    }

    // La sesión aún no se entrega.
    // Queda pendiente hasta que la app demuestre
    // que conoce el secreto original.

    intercambios.set(state, {
      challenge: autorizacion.challenge,
      openId: datos.open_id,
      accessToken: datos.access_token,
      refreshToken: datos.refresh_token || null,
      createdAt: Date.now(),
    });

    return res.json({
      ok: true,
      verified: true,
      message: "TikTok verificó la autorización correctamente.",
    });
  } catch (error) {
    console.error(
      "Error al conectar con TikTok:",
      error instanceof Error ? error.message : error,
    );

    return res.status(502).json({
      ok: false,
      error: "No fue posible comunicarse con TikTok.",
    });
  }
});

// ==================================================
// CONSULTAR ESTADO DE AUTORIZACIÓN
// ==================================================
//
// Expo Go consulta esta ruta mientras el usuario
// autoriza TikTok en el navegador.
//
// No se entregan tokens en esta consulta.

app.post("/auth/tiktok/poll", (req, res) => {
  const { state, verifier } = req.body || {};

  if (!esTokenValido(state) || !esTokenValido(verifier)) {
    return res.status(400).json({
      ok: false,
      error: "Datos de verificación inválidos.",
    });
  }

  limpiarExpirados();

  const challenge = hashToken(verifier);

  const pendiente = autorizacionesPendientes.get(state);

  if (pendiente) {
    if (pendiente.challenge !== challenge) {
      return res.status(403).json({
        ok: false,
        error: "Verificación no autorizada.",
      });
    }

    return res.json({
      ok: true,
      status: "pending",
    });
  }

  const intercambio = intercambios.get(state);

  if (!intercambio) {
    return res.status(404).json({
      ok: false,
      error: "Autorización inexistente, expirada o utilizada.",
    });
  }

  if (intercambio.challenge !== challenge) {
    return res.status(403).json({
      ok: false,
      error: "Verificación no autorizada.",
    });
  }

  // Solo el dispositivo que inició la autorización
  // puede reclamar esta sesión.
  intercambios.delete(state);

  const tokenSesion = generarToken();

  sesiones.set(hashToken(tokenSesion), {
    openId: intercambio.openId,
    accessToken: intercambio.accessToken,
    refreshToken: intercambio.refreshToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + TIEMPO_SESION,
  });

  return res.json({
    ok: true,
    status: "complete",
    sessionToken: tokenSesion,
    expiresIn: TIEMPO_SESION / 1000,
  });
});

// ==================================================
// VALIDAR SESIÓN
// ==================================================

app.get("/auth/session", (req, res) => {
  limpiarExpirados();

  const sesion = obtenerSesion(req);

  if (!sesion) {
    return res.status(401).json({
      ok: false,
      authenticated: false,
      error: "Sesión inválida o expirada.",
    });
  }

  return res.json({
    ok: true,
    authenticated: true,
    user: {
      provider: "tiktok",
      openId: sesion.openId,
    },
  });
});

// ==================================================
// CERRAR SESIÓN
// ==================================================

app.post("/auth/logout", (req, res) => {
  const authorization = req.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      ok: false,
      error: "Sesión no proporcionada.",
    });
  }

  const token = authorization.slice(7);

  if (!esTokenValido(token)) {
    return res.status(401).json({
      ok: false,
      error: "Sesión inválida.",
    });
  }

  sesiones.delete(hashToken(token));

  return res.json({
    ok: true,
    message: "Sesión cerrada.",
  });
});

// ==================================================
// INICIAR SERVIDOR
// ==================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend TikTok listo en http://localhost:${PORT}`);
});
