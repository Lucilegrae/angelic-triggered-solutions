-- Mechanisation Requests Table (Tightened Schema)
create table if not exists mechanisation_requests (
  id uuid primary key default gen_random_uuid(),

  -- Stakeholder Link
  stakeholder_id uuid not null references stakeholders(id) on delete cascade,

  -- Machine / Equipment Identity
  machine_type text not null
    check (
      machine_type in (
        'Tractor',
        'Combine Harvester',
        'Planter',
        'Baler',
        'Irrigation System',
        'Other'
      )
    ),

  machine_model text,
  serial_number text,

  -- Request Details
  request_description text not null,
  quantity int not null check (quantity > 0),

  -- Approval Workflow
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),

  approved_by text,
  approval_notes text,

  -- Ministry Assignment
  ministry text not null
    check (
      ministry in (
        'Mines',
        'Lands',
        'SMEs',
        'Agriculture',
        'Other'
      )
    ),

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update timestamp
create or replace function update_mech_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_mech_timestamp_trigger
before update on mechanisation_requests
for each row
execute procedure update_mech_timestamp();
