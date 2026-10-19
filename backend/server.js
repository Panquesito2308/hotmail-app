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

// ==================================================
// CONFIGURACIÓN GENERAL
// ==================================================

app.use(express.json({ limit: "16kb" }));

// Permitir que GitHub Pages se comunique con nuestro
// endpoint de verificación de TikTok.
//
// Nota: CORS controla el acceso desde navegadores.
// No sustituye la validación del state ni una sesión.
app.use((req, res, next) => {
  if (req.path !== "/auth/tiktok/callback") {
    return next();
  }

  const origin = req.headers.origin;

  if (origin !== ORIGEN_PERMITIDO) {
    return res.status(403).json({
      ok: false,
      error: "Origen no permitido.",
    });
  }

  res.setHeader("Access-Control-Allow-Origin", ORIGEN_PERMITIDO);
  res.setHeader("Vary", "Origin");
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

function limpiarExpirados() {
  const ahora = Date.now();

  for (const [state, datos] of autorizacionesPendientes) {
    if (ahora - datos.createdAt > TIEMPO_AUTORIZACION) {
      autorizacionesPendientes.delete(state);
    }
  }

  for (const [id, sesion] of sesiones) {
    if (ahora > sesion.expiresAt) {
      sesiones.delete(id);
    }
  }
}

function validarState(state) {
  if (typeof state !== "string" || !/^[a-f0-9]{64}$/.test(state)) {
    return false;
  }

  return autorizacionesPendientes.has(state);
}

// ==================================================
// COMPROBAR SERVIDOR
// ==================================================

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "TikTok auth backend",
  });
});

// ==================================================
// COMPROBAR CONFIGURACIÓN DE TIKTOK
// ==================================================

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
// INICIAR AUTORIZACIÓN CON TIKTOK
// ==================================================

app.get("/auth/tiktok/start", (req, res) => {
  const { TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI } =
    process.env;

  if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET || !TIKTOK_REDIRECT_URI) {
    return res.status(500).json({
      ok: false,
      error: "Faltan variables de TikTok.",
    });
  }

  limpiarExpirados();

  const state = crypto.randomBytes(32).toString("hex");

  autorizacionesPendientes.set(state, {
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
    authorizationUrl: url.toString(),
  });
});

// ==================================================
// RECIBIR Y VERIFICAR RESPUESTA DE TIKTOK
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
    !validarState(state)
  ) {
    return res.status(400).json({
      ok: false,
      error: "Respuesta de autorización incompleta o no válida.",
    });
  }

  const autorizacion = autorizacionesPendientes.get(state);

  if (
    !autorizacion ||
    Date.now() - autorizacion.createdAt > TIEMPO_AUTORIZACION
  ) {
    autorizacionesPendientes.delete(state);

    return res.status(400).json({
      ok: false,
      error: "La autorización expiró.",
    });
  }

  // Evitar reutilizar la misma autorización.
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

    const idSesion = crypto.randomBytes(32).toString("hex");

    sesiones.set(idSesion, {
      openId: datos.open_id,
      accessToken: datos.access_token,
      refreshToken: datos.refresh_token || null,
      createdAt: Date.now(),
      expiresAt: Date.now() + TIEMPO_SESION,
    });

    // No enviamos tokens de TikTok ni identificadores
    // de sesión al navegador de GitHub Pages.
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
// INICIAR SERVIDOR
// ==================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend TikTok listo en http://localhost:${PORT}`);
});
