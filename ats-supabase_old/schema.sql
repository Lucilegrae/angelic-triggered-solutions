-- Drop existing tables to avoid duplication
drop table if exists audit_trails cascade;
drop table if exists stakeholders cascade;
drop table if exists institutions cascade;

-- Recreate canonical schema with IF NOT EXISTS safety
create table if not exists institutions (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    sector text not null,
    created_at timestamptz default now()
);

create table if not exists stakeholders (
    id uuid primary key default gen_random_uuid(),
    institution_id uuid references institutions(id),
    role text check (role in ('ministry','investor','communal')),
    name text not null,
    email text,
    joined_at timestamptz default now()
);

create table if not exists audit_trails (
    id uuid primary key default gen_random_uuid(),
    stakeholder_id uuid references stakeholders(id),
    action text not null,
    commentary text,
    signature text,
    created_at timestamptz default now()
);
