import { router } from "expo-router";

export type PerfilRuta = "/perfil-francisco" | "/perfil-adrian";

export function abrirPerfil(perfil: PerfilRuta, autenticado: boolean) {
  if (autenticado) {
    router.push(perfil);
    return;
  }

  router.push({
    pathname: "/login",
    params: {
      redirect: perfil,
    },
  });
}
