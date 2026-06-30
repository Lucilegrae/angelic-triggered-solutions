import { createClient } from '@supabase/supabase-js'

// Initialize client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    // Optional: enable auto-retry and logging
    realtime: { params: { eventsPerSecond: 10 } }
  }
)

// Define filters (parameterized)
const filters = {
  p_sector_name: 'Banking',
  p_metric_name: 'Net Profit',
  p_start_date: '2025-01-01',
  p_end_date: '2026-12-31',
  p_institution_id: '5adc8146-9758-45e2-88cd-82d8fb2d2277'
}

// Run parameterized query with upgraded handling
async function runQuery() {
  try {
    console.log('Running hierarchical_cte_query with filters:', filters)

    const { data, error } = await supabase.rpc('hierarchical_cte_query', filters)

    if (error) {
      throw new Error(`Supabase RPC failed: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.warn('No results returned for given filters.')
      return []
    }

    // Log summary instead of dumping entire dataset
    console.log(`Query returned ${data.length} rows.`)
    console.table(data.slice(0, 5)) // preview first 5 rows

    return data
  } catch (err) {
    console.error('Query execution error:', err)
    return null
  }
}

// Execute
runQuery()
