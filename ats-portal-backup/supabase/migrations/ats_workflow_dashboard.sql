CREATE OR REPLACE FUNCTION public.ats_workflow_dashboard()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
AS $$
SELECT json_build_object(
  'total', (SELECT COUNT(*) FROM ats_workflows),

  'by_state', (
    SELECT json_agg(
      json_build_object('state', state, 'count', count)
    )
    FROM (
      SELECT state, COUNT(*) AS count
      FROM ats_workflows
      GROUP BY state
      ORDER BY count DESC
    ) t
  ),

  'recent', (
    SELECT json_agg(
      json_build_object(
        'id', id,
        'state', state,
        'created_at', created_at,
        'ministry_id', ministry_id,
        'sector_id', sector_id
      )
    )
    FROM (
      SELECT id, state, created_at, ministry_id, sector_id
      FROM ats_workflows
      ORDER BY created_at DESC
      LIMIT 20
    ) r
  )
);
$$;
