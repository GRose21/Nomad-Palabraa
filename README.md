# Nomad Palabra — CEFR Language Coach

Nomad Palabra is a responsive React application for estimating a learner's CEFR level, creating a personalized study plan, and finding useful language-learning resources. Choose Spanish or Italian from the selector at the top of the app; the English interface stays the same while lessons, grammar, vocabulary, assessment, audio, and practice switch to the selected language. Progress is saved separately for each language.

## Features

- An 18-question CEFR-style assessment
- Progressive Spanish and Italian learning paths from Pre-A1 (no prior knowledge) through C2, with vocabulary, grammar, graded passages, comprehension, listening, speaking, and saved lesson progress
- Grammar courses for both languages from A1 foundations through C2 structures, with teaching examples and scored exercises
- Searchable, CEFR-filtered vocabulary libraries assembled from each language's grammar and learning-path lessons
- A 21-item resource library with embedded videos and graded in-app readings, audio, and comprehension checks
- 22 level-filtered practice activities with Spanish or Italian audio across Pre-A1–C2
- An 18-question placement assessment for each language, spanning beginner through advanced
- Progress tracking with course and grammar completion, recorded study time, activity milestones, an editable daily goal, and a calendar-based learning streak
- Optional email accounts with per-user cloud-synced progress through Supabase; without account configuration, progress remains saved in the current browser
- Dark mode and browser-persisted progress
- Responsive desktop, tablet, and mobile design

Grammar lesson examples that should appear in Vocabulary use the format `target-language phrase — English translation`; those pairs are extracted and deduplicated automatically. Vocabulary also includes the translated terms attached to Pre-A1 and Learn-path lessons.

## Run locally

```sh
npm install
npm run dev
```

Then open the URL printed by Vite, usually http://localhost:5173/.

## Enable accounts and cloud progress

The app uses Supabase email/password authentication and a private `user_progress` row for each account. Without Supabase settings, the app still works and saves progress in the current browser.

1. Create a free Supabase project.
2. In the Supabase SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql). The table uses row-level security so signed-in users can only read or change their own progress.
3. Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project URL and its public publishable/anon key.
4. Restart `npm run dev`. Open **Account** in the sidebar to create an account or sign in. On a new account, existing browser progress is migrated once; after that, each account keeps separate progress.
5. In Supabase **Authentication → URL Configuration**, allow the local app URL (for example `http://localhost:5173`) and the deployed Cloudflare Pages URL. Email confirmation may be enabled by default.

Only the public publishable/anon key belongs in the frontend. Never put a Supabase `service_role` key in `.env.local`, Cloudflare build variables, or any `VITE_` variable. Keep the SQL row-level security policies enabled. Supabase's built-in email sender has restrictive delivery/rate limits; if confirmation messages to your friend are not delivered, configure an SMTP provider in Supabase. Free-tier limits and availability can change.

## Share the app online for free

Cloudflare Pages can host the built Vite app on a public `*.pages.dev` URL:

1. Push this project to a GitHub repository. It can be private; the deployed website itself will be public to anyone with its URL.
2. In Cloudflare, create a **Workers & Pages → Pages** project and connect the GitHub repository.
3. Choose the **Vite** framework preset, build command `npm run build`, and output directory `dist`.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Cloudflare Pages environment variables for both Production and Preview, then deploy.
5. Add the new `https://<your-project>.pages.dev` address to Supabase's allowed site/redirect URLs. Share that address with your friend; they can create their own account.

For a first setup, you can test the production build locally with `npm run build` and `npm run preview`. Hosting and authentication are subject to each provider's current free-plan limits.

> The assessment is an educational estimate, not a formal CEFR certification. Resource availability may vary by region.
