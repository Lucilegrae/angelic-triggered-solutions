-- Compliance Documents Table (Tightened Schema)
create table if not exists compliance_documents (
  id uuid primary key default gen_random_uuid(),

  -- Stakeholder Link
  stakeholder_id uuid not null references stakeholders(id) on delete cascade,

  -- Compliance Type Classification
  compliance_type text not null
    check (
      compliance_type in (
        'Environmental',
        'Tax',
        'Safety',
        'Operational',
        'Financial',
        'Agricultural',
        'Other'
      )
    ),

  -- Document Metadata
  description text not null,
  pdf_url text,  -- stored in Supabase Storage

  -- Approval Workflow
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),

  approved_by text,
  approval_notes text,

  -- Ministry Assignment
  ministry text not null
    check (
      ministry in (
        'Finance',
        'ZIMRA',
        'Mines',
        'Lands',
        'SMEs',
        'Environment',
        'Other'
      )
    ),

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update timestamp
create or replace function update_compliance_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_compliance_timestamp_trigger
before update on compliance_documents
for each row
execute procedure update_compliance_timestamp();
