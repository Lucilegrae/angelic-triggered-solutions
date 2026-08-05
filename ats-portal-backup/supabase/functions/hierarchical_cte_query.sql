CREATE OR REPLACE FUNCTION hierarchical_cte_query(
  p_sector_name TEXT,
  p_metric_name TEXT,
  p_start_date DATE,
  p_end_date DATE,
  p_institution_id UUID,
  p_limit INT DEFAULT 20,
  p_offset INT DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  member_id UUID,
  blessing TEXT,
  branch TEXT,
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT ll.id, ll.member_id, ll.blessing, ll.branch, ll.created_at
  FROM lineage_logs ll
  WHERE ll.created_at BETWEEN p_start_date AND p_end_date
    AND (p_sector_name IS NULL OR ll.branch = p_sector_name)
  ORDER BY ll.created_at DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
