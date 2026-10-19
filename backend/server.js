const express = require("express");
const crypto = require("node:crypto");
const path = require("node:path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const autorizacionesPendientes = new Map();

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

app.get("/auth/tiktok/start", (req, res) => {
  const { TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REDIRECT_URI } =
    process.env;

  if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET || !TIKTOK_REDIRECT_URI) {
    return res.status(500).json({
      ok: false,
      error: "Faltan variables de TikTok.",
    });
  }

  const state = crypto.randomBytes(32).toString("hex");

  // El state deberá validarse cuando llegue el callback.
  // Se guarda temporalmente en el backend.
  autorizacionesPendientes.set(state, {
    createdAt: Date.now(),
  });

  // Eliminar solicitudes antiguas.
  for (const [key, value] of autorizacionesPendientes) {
    if (Date.now() - value.createdAt > 10 * 60 * 1000) {
      autorizacionesPendientes.delete(key);
    }
  }

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend TikTok listo en http://localhost:${PORT}`);
});
