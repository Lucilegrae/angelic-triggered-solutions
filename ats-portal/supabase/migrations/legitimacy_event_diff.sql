create or replace function legitimacy_event_diff(uid uuid, event_id uuid)
returns jsonb
language plpgsql
as $$
declare
  current_rec record;
  archived_rec record;
begin
  -- Current legitimacy state
  select *
  into current_rec
  from legitimacy
  where user_id = uid;

  -- Archived event
  select *
  into archived_rec
  from legitimacy_event_archive
  where id = event_id
  and user_id = uid;

  if archived_rec is null then
    raise exception 'Archived event not found';
  end if;

  return jsonb_build_object(
    'current', jsonb_build_object(
      'stage', current_rec.stage,
      'progress', current_rec.progress
    ),
    'archived', jsonb_build_object(
      'stage', archived_rec.stage,
      'progress', archived_rec.progress,
      'source', archived_rec.source,
      'anomaly', archived_rec.anomaly,
      'created_at', archived_rec.created_at
    ),
    'diff', jsonb_build_object(
      'stage_changed', current_rec.stage <> archived_rec.stage,
      'progress_delta', archived_rec.progress - current_rec.progress
    )
  );
end;
$$;
