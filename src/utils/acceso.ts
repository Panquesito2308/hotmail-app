import { router } from "expo-router";
import { verificarSesion } from "./sesion";

type PerfilRuta =
  | "/perfil-francisco"
  | "/perfil-luis"
  | "/perfil-sosa"
  | "/perfil-sara";

export async function abrirPerfil(perfil: PerfilRuta): Promise<void> {
  const autenticado = await verificarSesion();

  if (autenticado) {
    router.push(perfil);
    return;
  }

  router.push({
    pathname: "/login",
    params: { redirect: perfil },
  });
}
