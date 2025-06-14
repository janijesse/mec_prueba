"use client";
import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login, logout, ready, authenticated, user } = usePrivy();

  const baseClass =
    "py-2 px-6 rounded-full transition-colors cursor-pointer select-none bg-[#FF9BDB] text-[#19203a] hover:bg-[#FF79C3]";

  if (!ready)
    return (
      <button className={baseClass} disabled>
        Cargando...
      </button>
    );

  if (authenticated)
    return (
      <button onClick={logout} className={baseClass}>
        Cerrar sesión
      </button>
    );

  return (
    <button onClick={login} className={baseClass}>
      Iniciar sesión
    </button>
  );
}
