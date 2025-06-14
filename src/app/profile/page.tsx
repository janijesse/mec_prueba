'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/utils/supabase/client';
import { usePrivy } from '@privy-io/react-auth';

const TAG_OPTIONS = [
  { value: "Hackaton", label: "Quiero participar en un hackaton" },
  { value: "Trabajo", label: "Busco trabajo" },
  { value: "Reclutando", label: "Búsqueda de empleados" },
  { value: "Socios", label: "Búsqueda de socios para su proyecto" }
];

export default function ProfilePage() {
  const { user, ready, authenticated } = usePrivy();
  const [mounted, setMounted] = useState(false);
  const supabase = createSupabaseClient();

  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    job: '',
    education: '',
    volunteering: '',
    contact: '',
    avatar_url: '',
    tags: [] as string[],
    role: '',
    approved: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && ready && authenticated && user) {
      const userId = user.id;
      setLoading(true);
      supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data }) => {
          if (data) setProfile({ ...profile, ...data });
          else {
            supabase.from('profiles').insert({ id: userId }).then(() => {});
          }
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [mounted, ready, authenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleTagChange = (tag: string) => {
    setProfile(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  // Subir imagen a Supabase Storage y obtener URL
  const uploadAvatar = async (userId: string) => {
    if (!avatarFile) return profile.avatar_url;
    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `${userId}.${fileExt}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile, { upsert: true });
    if (error) {
      setMessage('Error subiendo imagen: ' + error.message);
      return profile.avatar_url;
    }
    // Obtener URL pública
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const userId = user.id;
    const avatar_url = await uploadAvatar(userId);

    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      name: profile.name,
      bio: profile.bio,
      job: profile.job,
      education: profile.education,
      volunteering: profile.volunteering,
      contact: profile.contact,
      avatar_url,
      tags: profile.tags,
      // role y approved no se modifican aquí
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Perfil guardado. Pendiente de aprobación.');
    setLoading(false);
  };

  if (!mounted) return null;
  if (!ready) return <p className="text-white p-8">Cargando...</p>;
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#19203a] p-8 text-white">
        <h1 className="text-2xl font-bold mb-4">Por favor, inicia sesión</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#19203a] p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Mi perfil</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 mx-0">
        <div>
          <label className="block mb-1 font-semibold">Nombre y apellido o seudónimo</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Foto (real o avatar)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
          />
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt="Avatar" className="mt-2 rounded-full w-24 h-24 object-cover" />
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Breve bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Trabajo</label>
          <input
            name="job"
            value={profile.job}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Educación</label>
          <input
            name="education"
            value={profile.education}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Voluntariados</label>
          <input
            name="volunteering"
            value={profile.volunteering}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Medio de contacto</label>
          <input
            name="contact"
            value={profile.contact}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a344b] border border-[#FF9BDB]/20 text-white"
            required
          />
        </div>
        {/* Etiquetas */}
        <div>
          <label className="block mb-1 font-semibold">Etiquetas para filtrar tu perfil:</label>
          <div className="flex flex-col gap-2">
            {TAG_OPTIONS.map(tag => (
              <label key={tag.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profile.tags.includes(tag.value)}
                  onChange={() => handleTagChange(tag.value)}
                />
                {tag.label}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF9BDB] text-[#19203a] py-2 px-6 rounded-full font-semibold hover:bg-[#FF79C3] transition"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
