import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key prefix:', supabaseAnonKey ? supabaseAnonKey.slice(0, 20) + '...' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQuery() {
  const { data, error } = await supabase
    .from('institutions')   // replace with a real table name from your schema
    .select('*')
    .limit(1);

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

testQuery();
