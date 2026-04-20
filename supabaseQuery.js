import { createClient } from '@supabase/supabase-js'

// Initialize client with environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Define filters
const sectorName = 'Banking'
const metricName = 'Net Profit'
const startDate = '2025-01-01'
const endDate = '2026-12-31'
const institutionId = '5adc8146-9758-45e2-88cd-82d8fb2d2277'

// Run parameterized query
async function runQuery() {
  const { data, error } = await supabase.rpc('hierarchical_cte_query', {
    p_sector_name: sectorName,
    p_metric_name: metricName,
    p_start_date: startDate,
    p_end_date: endDate,
    p_institution_id: institutionId
  })

  if (error) {
    console.error('Query failed:', error)
  } else {
    console.log('Results:', data)
  }
}

runQuery()
