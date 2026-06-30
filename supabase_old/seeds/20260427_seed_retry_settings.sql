/* ✦ Golden Aura Seed Script ✦ */
-- Preload multiple retry configurations for officials

insert into retry_settings (id, count, delay)
values (1, 2, 5000) -- Default: 2 retries, 5s delay
on conflict (id) do update set count = excluded.count, delay = excluded.delay;

insert into retry_settings (id, count, delay)
values (2, 3, 3000) -- Daily resilience: 3 retries, 3s delay
on conflict (id) do update set count = excluded.count, delay = excluded.delay;

insert into retry_settings (id, count, delay)
values (3, 5, 10000) -- Weekly resilience: 5 retries, 10s delay
on conflict (id) do update set count = excluded.count, delay = excluded.delay;

insert into retry_settings (id, count, delay)
values (4, 7, 15000) -- Monthly resilience: 7 retries, 15s delay
on conflict (id) do update set count = excluded.count, delay = excluded.delay;
