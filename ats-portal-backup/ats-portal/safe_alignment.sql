-- Add compliance_count only if missing
do $$
begin
    if not exists (
        select 1
        from information_schema.columns
        where table_name='stakeholders'
        and column_name='compliance_count'
    ) then
        alter table stakeholders add column compliance_count integer default 0;
    end if;
end $$;

-- Add mechanisation_count only if missing
do $$
begin
    if not exists (
        select 1
        from information_schema.columns
        where table_name='stakeholders'
        and column_name='mechanisation_count'
    ) then
        alter table stakeholders add column mechanisation_count integer default 0;
    end if;
end $$;
