import { router, type Href } from "expo-router";

export type PerfilRuta = "/perfil-francisco" | "/perfil-luis";

export function abrirPerfil(perfil: PerfilRuta, autenticado: boolean) {
  if (autenticado) {
    router.push(perfil as Href);
    return;
  }

  router.push({
    pathname: "/login",
    params: {
      redirect: perfil,
    },
  });
}
