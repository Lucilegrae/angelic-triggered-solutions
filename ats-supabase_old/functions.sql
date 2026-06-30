-- Ministry onboarding
create or replace function onboard_ministry(
  institution_name text,
  stakeholder_name text,
  stakeholder_email text
) returns uuid as $$
declare sid uuid;
begin
  insert into institutions(name, sector) values (institution_name, 'government')
  on conflict (name) do nothing;

  insert into stakeholders(institution_id, role, name, email)
  values (
    (select id from institutions where name = institution_name),
    'ministry',
    stakeholder_name,
    stakeholder_email
  )
  returning id into sid;

  insert into audit_trails(stakeholder_id, action, commentary, signature)
  values (sid, 'onboarded', 'Ministry onboarding complete', stakeholder_name);

  return sid;
end;
$$ language plpgsql;

-- Investor onboarding
create or replace function onboard_investor(
  institution_name text,
  stakeholder_name text,
  stakeholder_email text
) returns uuid as $$
declare sid uuid;
begin
  insert into institutions(name, sector) values (institution_name, 'finance')
  on conflict (name) do nothing;

  insert into stakeholders(institution_id, role, name, email)
  values (
    (select id from institutions where name = institution_name),
    'investor',
    stakeholder_name,
    stakeholder_email
  )
  returning id into sid;

  insert into audit_trails(stakeholder_id, action, commentary, signature)
  values (sid, 'onboarded', 'Investor onboarding complete', stakeholder_name);

  return sid;
end;
$$ language plpgsql;

-- Communal onboarding
create or replace function onboard_communal(
  institution_name text,
  stakeholder_name text,
  stakeholder_email text
) returns uuid as $$
declare sid uuid;
begin
  insert into institutions(name, sector) values (institution_name, 'communal')
  on conflict (name) do nothing;

  insert into stakeholders(institution_id, role, name, email)
  values (
    (select id from institutions where name = institution_name),
    'communal',
    stakeholder_name,
    stakeholder_email
  )
  returning id into sid;

  insert into audit_trails(stakeholder_id, action, commentary, signature)
  values (sid, 'onboarded', 'Communal onboarding complete', stakeholder_name);

  return sid;
end;
$$ language plpgsql;
