-- Table profiles liée aux utilisateurs Supabase Auth
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null unique,
    role text not null default 'user' check (role in ('user', 'admin')),
    created_at timestamptz not null default now()
);

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;

create policy "Un utilisateur peut lire son propre profil"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Un utilisateur peut modifier son propre profil"
    on public.profiles for update
    using (auth.uid() = id);
