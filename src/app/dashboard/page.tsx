'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/utils/supabase/client';

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('approved', false);
      if (error) setError(error.message);
      setProfiles(data || []);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const approveProfile = async (id: string, name: string) => {
    const confirmed = window.confirm(`¿Seguro que quieres aprobar el perfil de ${name}?`);
    if (!confirmed) return;

    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from('profiles')
      .update({ approved: true })
      .eq('id', id);
    if (!error) {
      setProfiles(profiles.filter(p => p.id !== id));
    } else {
      alert('Error aprobando perfil: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#19203a] p-8 text-white">
      <main className="w-full max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-3xl font-bold">Perfiles pendientes de aprobación</h1>
        {loading ? (
          <div className="text-gray-300">Cargando...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : profiles.length === 0 ? (
          <p className="text-gray-300">No hay perfiles pendientes.</p>
        ) : (
          <ul className="space-y-4">
            {profiles.map(profile => (
              <li
                key={profile.id}
                className="flex flex-col md:flex-row md:items-center justify-between bg-[#2a344b] p-4 rounded-lg border border-[#FF9BDB]/20 shadow"
              >
                <div className="text-left">
                  <p className="text-lg font-semibold">{profile.name}</p>
                  <p className="text-gray-300">{profile.bio}</p>
                </div>
                <button
                  onClick={() => approveProfile(profile.id, profile.name)}
                  className="mt-4 md:mt-0 md:ml-4 bg-[#FF9BDB] text-[#19203a] py-2 px-6 rounded-full transition-colors hover:bg-[#FF79C3] font-semibold"
                  aria-label={`Aprobar perfil de ${profile.name}`}
                >
                  Aprobar
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
