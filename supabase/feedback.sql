create table if not exists public.user_feedback (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('bug', 'recommendation', 'other')),
  message text not null check (char_length(btrim(message)) between 10 and 5000),
  language text not null check (language in ('Spanish', 'Italian', 'Mandarin Chinese', 'Modern Standard Arabic', 'Russian')),
  page text not null check (page in (
    'dashboard',
    'assessment',
    'learn',
    'grammar',
    'vocabulary',
    'writing',
    'resources',
    'play',
    'dlpt',
    'dlpt-listening',
    'progress',
    'feedback'
  )),
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Existing projects: widen the original constraints so every language and tab can submit feedback.
alter table public.user_feedback drop constraint if exists user_feedback_language_check;
alter table public.user_feedback add constraint user_feedback_language_check
  check (language in ('Spanish', 'Italian', 'Mandarin Chinese', 'Modern Standard Arabic', 'Russian'));
alter table public.user_feedback drop constraint if exists user_feedback_page_check;
alter table public.user_feedback add constraint user_feedback_page_check
  check (page in ('dashboard', 'assessment', 'learn', 'grammar', 'vocabulary',
    'writing', 'resources', 'play', 'dlpt', 'dlpt-listening', 'progress', 'feedback'));

alter table public.user_feedback enable row level security;

drop policy if exists "Anyone can submit feedback" on public.user_feedback;
create policy "Anyone can submit feedback"
  on public.user_feedback
  for insert
  to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

revoke all on table public.user_feedback from public, anon, authenticated;
grant insert on table public.user_feedback to anon, authenticated;
