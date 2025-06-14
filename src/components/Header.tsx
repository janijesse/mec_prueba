'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function Header() {
  const { authenticated, login, logout, user } = usePrivy();

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-[#2a344b] text-white shadow">
      <div className="font-bold text-xl">
        <a href="/">MEC APP</a>
      </div>
      <nav className="flex gap-4 items-center">
        <a href="/profiles" className="hover:underline">Perfiles</a>
        <a href="/profile" className="hover:underline">Mi Perfil</a>
        <a href="/dashboard" className="hover:underline">Dashboard</a>
        {authenticated ? (
          <>
            <span className="text-sm text-[#FF9BDB]">
              {user?.id?.slice(0, 6)}...{user?.id?.slice(-4)}
            </span>
            <button
              onClick={logout}
              className="bg-[#FF9BDB] text-[#19203a] px-4 py-1 rounded hover:bg-[#FF79C3] font-semibold"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="bg-[#FF9BDB] text-[#19203a] px-4 py-1 rounded hover:bg-[#FF79C3] font-semibold"
          >
            Iniciar sesión
          </button>
        )}
      </nav>
    </header>
  );
}
