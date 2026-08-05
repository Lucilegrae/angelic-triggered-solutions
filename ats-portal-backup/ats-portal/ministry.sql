-- Ministry Table (Tightened Schema)
create table if not exists ministries (
  id uuid primary key default gen_random_uuid(),

  -- Ministry Identity
  name text not null unique,
  code text not null unique,  -- e.g. FIN, ZIMRA, MINES, LANDS, SMEs

  -- Ministry Type Classification
  ministry_type text not null
    check (
      ministry_type in (
        'Finance',
        'ZIMRA',
        'Mines',
        'Lands',
        'SMEs',
        'Other'
      )
    ),

  -- Assigned Officer (for approvals)
  officer_name text,
  officer_email text,
  officer_phone text,

  -- Operational Status
  status text not null default 'active'
    check (status in ('active', 'inactive', 'suspended')),

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update timestamp
create or replace function update_ministry_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_ministry_timestamp_trigger
before update on ministries
for each row
execute procedure update_ministry_timestamp();
