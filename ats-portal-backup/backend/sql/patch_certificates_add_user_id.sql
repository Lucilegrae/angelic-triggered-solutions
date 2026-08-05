alter table certificates
add column if not exists user_id uuid;
