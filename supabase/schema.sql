create extension if not exists "pgcrypto";

create table vehicle_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  sort_order int not null default 0
);

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  description text,
  sort_order int not null default 0
);

create table service_prices (
  service_id uuid references services(id) on delete cascade,
  vehicle_category_id uuid references vehicle_categories(id) on delete cascade,
  price_cents int not null,
  duration_minutes int not null,
  primary key (service_id, vehicle_category_id)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  vehicle_category_id uuid references vehicle_categories(id),
  service_id uuid references services(id),
  customer_name text not null,
  customer_phone text not null,
  plate text not null,
  booking_date date not null,
  start_time time not null,
  duration_minutes int not null,
  status text not null default 'agendado' check (status in ('agendado','em_curso','concluido','cancelado')),
  created_at timestamptz not null default now()
);

create table settings (
  id int primary key default 1,
  business_name text not null default 'Carwash Loulé',
  business_hours jsonb not null default '{
    "0": null,
    "1": {"open":"09:00","close":"19:00"},
    "2": {"open":"09:00","close":"19:00"},
    "3": {"open":"09:00","close":"19:00"},
    "4": {"open":"09:00","close":"19:00"},
    "5": {"open":"09:00","close":"19:00"},
    "6": {"open":"09:00","close":"13:00"}
  }'::jsonb,
  slot_interval_minutes int not null default 15,
  simultaneous_capacity int not null default 2,
  check (id = 1)
);

insert into settings (id) values (1) on conflict do nothing;

insert into vehicle_categories (slug,label,sort_order) values
  ('citadino','Citadino',1),
  ('ligeiro','Ligeiro / Berlina',2),
  ('suv','SUV / Monovolume',3),
  ('carrinha','Carrinha grande',4),
  ('moto','Moto',5)
on conflict (slug) do nothing;

insert into services (slug,label,description,sort_order) values
  ('simples','Simples','Lavagem exterior e aspiração.',1),
  ('completa','Completa','Exterior, aspiração e limpeza interior detalhada.',2),
  ('plus','Plus','Lavagem completa com tratamentos e acabamentos.',3)
on conflict (slug) do nothing;

insert into service_prices (service_id, vehicle_category_id, price_cents, duration_minutes)
select s.id, v.id, t.price, t.duration
from (values
  ('simples','citadino',1500,45),
  ('simples','ligeiro',1800,45),
  ('simples','suv',2200,60),
  ('simples','carrinha',2500,75),
  ('simples','moto',1500,30),
  ('completa','citadino',2500,60),
  ('completa','ligeiro',3000,60),
  ('completa','suv',3500,75),
  ('completa','carrinha',4000,90),
  ('plus','citadino',3500,90),
  ('plus','ligeiro',4000,90),
  ('plus','suv',4500,105),
  ('plus','carrinha',5000,120)
) as t(service_slug, vehicle_slug, price, duration)
join services s on s.slug = t.service_slug
join vehicle_categories v on v.slug = t.vehicle_slug
on conflict (service_id, vehicle_category_id) do nothing;

alter table vehicle_categories enable row level security;
alter table services enable row level security;
alter table service_prices enable row level security;
alter table settings enable row level security;
alter table bookings enable row level security;

create policy "public read vehicle_categories" on vehicle_categories for select using (true);
create policy "public read services" on services for select using (true);
create policy "public read service_prices" on service_prices for select using (true);
create policy "public read settings" on settings for select using (true);

create policy "admin manage vehicle_categories" on vehicle_categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage services" on services for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage service_prices" on service_prices for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage settings" on settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public insert bookings" on bookings for insert to anon with check (true);
create policy "admin manage bookings" on bookings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Vista sem dados pessoais, usada pelo site público para calcular disponibilidade.
-- Sem security_invoker: corre com os privilégios do dono da vista, contornando
-- a ausência de policy de SELECT para 'anon' na tabela bookings.
create view available_slots_raw as
select booking_date, start_time, duration_minutes
from bookings
where status in ('agendado','em_curso');

grant select on available_slots_raw to anon, authenticated;

alter table bookings add column price_cents int;
alter table bookings add column paid boolean not null default false;

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_phone text,
  contact_email text,
  notes text,
  created_at timestamptz not null default now()
);

create table company_vehicles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  plate text not null,
  label text
);

alter table bookings add column company_id uuid references companies(id);

create table blocked_periods (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null,
  start_time time,
  end_time time,
  reason text
);

alter table companies enable row level security;
alter table company_vehicles enable row level security;
alter table blocked_periods enable row level security;

create policy "admin manage companies" on companies for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage company_vehicles" on company_vehicles for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read blocked_periods" on blocked_periods for select using (true);
create policy "admin manage blocked_periods" on blocked_periods for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table financial_entries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('receita','despesa')),
  description text not null,
  amount_cents int not null,
  payment_method text check (payment_method in ('dinheiro','mbway')),
  status text not null default 'pago' check (status in ('pago','pendente')),
  entry_date date not null,
  due_date date,
  created_at timestamptz not null default now()
);

alter table financial_entries enable row level security;
create policy "admin manage financial_entries" on financial_entries for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  unit text,
  quantity numeric not null default 0,
  min_quantity numeric not null default 0,
  created_at timestamptz not null default now()
);

create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  type text not null check (type in ('entrada','saida')),
  quantity numeric not null check (quantity > 0),
  note text,
  created_at timestamptz not null default now()
);

create function apply_stock_movement() returns trigger as $$
begin
  if new.type = 'entrada' then
    update products set quantity = quantity + new.quantity where id = new.product_id;
  else
    update products set quantity = quantity - new.quantity where id = new.product_id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_apply_stock_movement
after insert on stock_movements
for each row execute function apply_stock_movement();

alter table products enable row level security;
alter table stock_movements enable row level security;
create policy "admin manage products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin manage stock_movements" on stock_movements for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table bookings alter column plate drop not null;
alter table bookings add column car_model text;
