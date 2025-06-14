import { createSupabaseClient } from '@/utils/supabase/client';

export default async function ProfilesPage() {
  const supabase = createSupabaseClient();

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfiles</h1>
      {profiles && profiles.length > 0 ? (
        <ul>
          {profiles.map(profile => (
            <li key={profile.id} className="mb-2">
              <strong>{profile.name}</strong> - {profile.bio}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay perfiles para mostrar.</p>
      )}
    </main>
  );
}
