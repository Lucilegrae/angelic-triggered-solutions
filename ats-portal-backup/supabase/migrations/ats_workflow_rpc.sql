-- Create workflow
CREATE OR REPLACE FUNCTION public.create_workflow(
  p_ministry_id uuid,
  p_sector_id uuid,
  p_title text,
  p_payload jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  me uuid := ats_current_member_id();
  wf_id uuid;
BEGIN
  INSERT INTO ats_workflows (
    ministry_id,
    sector_id,
    state,
    created_by,
    title,
    payload
  )
  VALUES (
    p_ministry_id,
    p_sector_id,
    'DRAFT',
    me,
    p_title,
    p_payload
  )
  RETURNING id INTO wf_id;

  INSERT INTO ats_workflow_steps (
    workflow_id,
    state,
    actor_id,
    note
  )
  VALUES (
    wf_id,
    'DRAFT',
    me,
    'Workflow created'
  );

  RETURN wf_id;
END;
$$;


-- Advance workflow with authority checks
CREATE OR REPLACE FUNCTION public.advance_workflow(
  p_workflow_id uuid,
  p_to_state text,
  p_note text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  me uuid := ats_current_member_id();
  wf ats_workflows;
  tr ats_workflow_transitions;
BEGIN
  SELECT * INTO wf
  FROM ats_workflows
  WHERE id = p_workflow_id;

  IF wf.id IS NULL THEN
    RAISE EXCEPTION 'Workflow not found';
  END IF;

  SELECT * INTO tr
  FROM ats_workflow_transitions
  WHERE from_state = wf.state
    AND to_state = p_to_state;

  IF tr.id IS NULL THEN
    RAISE EXCEPTION 'Invalid transition from % to %', wf.state, p_to_state;
  END IF;

  -- Authority checks
  IF tr.requires_approve THEN
    IF NOT ats_has_workflow_authority(wf.ministry_id, wf.sector_id, 'approve') THEN
      RAISE EXCEPTION 'Approval authority required';
    END IF;
  END IF;

  IF tr.requires_override THEN
    IF NOT ats_has_workflow_authority(wf.ministry_id, wf.sector_id, 'override') THEN
      RAISE EXCEPTION 'Override authority required';
    END IF;
  END IF;

  -- Apply transition
  UPDATE ats_workflows
  SET state = p_to_state,
      updated_at = now()
  WHERE id = p_workflow_id;

  INSERT INTO ats_workflow_steps (
    workflow_id,
    state,
    actor_id,
    note
  )
  VALUES (
    p_workflow_id,
    p_to_state,
    me,
    p_note
  );

  RETURN true;
END;
$$;


-- Timeline
CREATE OR REPLACE FUNCTION public.get_workflow_timeline(
  p_workflow_id uuid
)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT json_agg(
    json_build_object(
      'state', s.state,
      'actor_id', s.actor_id,
      'note', s.note,
      'created_at', s.created_at
    )
    ORDER BY s.created_at
  )
  FROM ats_workflow_steps s
  WHERE s.workflow_id = p_workflow_id;
$$;
