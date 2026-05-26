/* ✦ Golden Aura Migration ✦ */
-- Create retry_settings table for ceremonial persistence
create table if not exists retry_settings (
  id int primary key,
  count int not null default 2,
  delay int not null default 5000
);

-- Insert default row if not present
insert into retry_settings (id, count, delay)
values (1, 2, 5000)
on conflict (id) do nothing;
