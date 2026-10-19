import * as SecureStore from "expo-secure-store";

const CLAVE_SESION = "beyond_tiktok_session";
const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export async function guardarSesion(token: string): Promise<void> {
  await SecureStore.setItemAsync(CLAVE_SESION, token);
}

export async function obtenerTokenSesion(): Promise<string | null> {
  return SecureStore.getItemAsync(CLAVE_SESION);
}

export async function eliminarSesion(): Promise<void> {
  await SecureStore.deleteItemAsync(CLAVE_SESION);
}

export async function verificarSesion(): Promise<boolean> {
  const token = await obtenerTokenSesion();
  if (!token || !API_URL) return false;

  try {
    const response = await fetch(`${API_URL}/auth/session`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      await eliminarSesion();
      return false;
    }

    if (!response.ok) return false;
    const data = await response.json();
    return data.ok === true && data.authenticated === true;
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    return false;
  }
}
