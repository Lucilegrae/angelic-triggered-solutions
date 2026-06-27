WITH sector_level AS (
  SELECT DISTINCT sector
  FROM institutions
),

institution_level AS (
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
         k.name AS kpi_name,
         k.unit
  FROM institution_level i
  JOIN kpis k ON i.institution_id = k.institution_id
),

production_level AS (
  SELECT k.sector,
         k.institution_id,
         k.institution_name,
         k.kpi_id,
         k.kpi_name,
         p.period,
         p.value
  FROM kpi_level k
  JOIN production_records p ON k.kpi_id = p.kpi_id
)

SELECT *
FROM production_level
ORDER BY sector, institution_name, kpi_name, period;
