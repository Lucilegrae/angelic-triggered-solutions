// query.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const run = async (sector, period) => {
  const sectorFilter = sector ? `%${sector}%` : null;
  const periodFilter = period ? `%${period}%` : null;

  // Debug log: show exactly what we’re sending
  console.log('RPC Payload:', {
    sector_filter: sectorFilter,
    period_filter: periodFilter
  });

  const { data, error } = await supabase.rpc('hierarchical_cte_query', {
    sector_filter: sectorFilter,
    period_filter: periodFilter
  });

  if (error) {
    console.error('Error:', error);
  } else if (!data || data.length === 0) {
    console.log(`No rows matched filters → sector: ${sector}, period: ${period}`);
    console.log('Tip: valid periods are monthly, quarterly, yearly.');
  } else {
    console.log(`Rows returned: ${data.length}`);
    console.log('Sample:', data.slice(0, 5));
  }
};

const [,, sectorArg, periodArg] = process.argv;

(async () => {
  await run(sectorArg || null, periodArg || null);
})();
