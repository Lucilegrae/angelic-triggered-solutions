-- Workflows (top-level process instance)
CREATE TABLE ats_workflows (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ministry_id  uuid,
  sector_id    uuid,
  state        text NOT NULL,   -- e.g. 'DRAFT', 'PENDING', 'APPROVED', 'REJECTED'
  created_by   uuid NOT NULL,   -- ats_members.id
  assigned_to  uuid,            -- ats_members.id
  title        text,
  payload      jsonb,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Workflow steps (timeline)
CREATE TABLE ats_workflow_steps (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id  uuid NOT NULL,
  state        text NOT NULL,
  actor_id     uuid NOT NULL,   -- ats_members.id
  note         text,
  created_at   timestamptz DEFAULT now(),
  CONSTRAINT fk_ws_workflow
    FOREIGN KEY (workflow_id) REFERENCES ats_workflows(id) ON DELETE CASCADE
);

-- Allowed transitions (engine rules)
CREATE TABLE ats_workflow_transitions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_state      text NOT NULL,
  to_state        text NOT NULL,
  requires_approve boolean DEFAULT false,
  requires_override boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX idx_workflows_ministry_sector
  ON ats_workflows (ministry_id, sector_id);

CREATE INDEX idx_workflow_steps_workflow
  ON ats_workflow_steps (workflow_id);
