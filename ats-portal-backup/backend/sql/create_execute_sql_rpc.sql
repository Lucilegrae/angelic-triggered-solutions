-- Create a SQL executor RPC so Termux can run migrations
create or replace function public.execute_sql(sql text)
returns json
language plpgsql
security definer
as $$
declare
    result json;
begin
    execute sql;
    return json_build_object('status', 'ok');
exception
    when others then
        return json_build_object(
            'status', 'error',
            'message', SQLERRM
        );
end;
$$;

-- Allow service role to execute it
grant execute on function public.execute_sql(text) to service_role;
