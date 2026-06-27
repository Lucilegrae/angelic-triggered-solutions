CREATE OR REPLACE FUNCTION public.hierarchical_cte_query()
RETURNS TABLE (
  sector text,
  institution_id uuid,
  institution_name text,
  kpi_id uuid,
  metric_name text,
  period text,
  metric_value numeric
)
LANGUAGE sql
AS $$
  WITH institution_level AS (
    SELECT i.sector,
           i.institution_id,
           i.name AS institution_name,
           i.status
    FROM institutions i
  ),
  kpi_level AS (
    SELECT i.sector,
           i.institution_id,
           i.institution_name,
           k.kpi_id,
           k.metric_name,
           k.period,
           k.metric_value
    FROM institution_level i
    JOIN kpis k ON i.institution_id = k.institution_id
  )
  SELECT *
  FROM kpi_level
  ORDER BY sector, institution_name, metric_name, period;
$$;
