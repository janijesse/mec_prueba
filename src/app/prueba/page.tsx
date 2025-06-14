import { createSupabaseClient } from '@/utils/supabase/client';

export default async function PruebaPage() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <h1>Prueba de conexión Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
