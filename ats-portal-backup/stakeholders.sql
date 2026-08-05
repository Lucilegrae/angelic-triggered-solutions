-- Stakeholders Table (Tightened Schema)
create table if not exists stakeholders (
  id uuid primary key default gen_random_uuid(),

  -- Identity
  name text not null,
  email text unique not null,
  phone text,
  sector text not null,

  -- Onboarding Status
  onboarding_status text not null default 'pending'
    check (onboarding_status in ('pending', 'in_review', 'approved', 'rejected')),

  -- Ministry Assignment (optional at onboarding)
  assigned_ministry text
    check (
      assigned_ministry in (
        'Finance',
        'ZIMRA',
        'Mines',
        'Lands',
        'SMEs',
        'None'
      )
    ),

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update timestamp
create or replace function update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_timestamp_trigger
before update on stakeholders
for each row
execute procedure update_timestamp();
