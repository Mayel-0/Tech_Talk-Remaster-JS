-- Table podcasts
create table public.podcasts (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    youtube_url text,
    name_intervenant text,
    date date,
    created_at timestamptz not null default now()
);

-- RLS
alter table public.podcasts enable row level security;

-- Tout le monde peut lire les podcasts
create policy "Lecture publique des podcasts"
    on public.podcasts for select
    using (true);

-- Seuls les admins peuvent créer/modifier/supprimer
create policy "Admin peut créer un podcast"
    on public.podcasts for insert
    with check (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Admin peut modifier un podcast"
    on public.podcasts for update
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Admin peut supprimer un podcast"
    on public.podcasts for delete
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );
