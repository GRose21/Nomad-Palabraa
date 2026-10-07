# Nomad Palabra — CEFR Language Coach

Nomad Palabra is a responsive React application for estimating a learner's CEFR level, creating a personalized study plan, and finding useful language-learning resources. Choose Spanish, Italian, Mandarin Chinese, Modern Standard Arabic (MSA), or Russian from the selector at the top of the app; the English interface stays the same while lessons, grammar, vocabulary, assessment, audio, and practice switch to the selected language. Progress is saved separately for each language.

## Features

- An 18-question CEFR-style assessment
- Progressive learning paths for all five languages from Pre-A1 (no prior knowledge) through C2, with ten lessons per CEFR level, vocabulary, grammar, level-scaled multi-paragraph readings, comprehension, listening, unrecorded speaking prompts, and saved lesson progress; Arabic lesson passages use Arabic text only
- College-style course framing from first-year elementary study through a fourth-year advanced capstone, with level-specific communication outcomes, signature projects, and independent study guidance; these are study guides, not college-credit equivalencies
- Grammar sequences that progress from foundational forms to advanced academic syntax, source attribution, register, and rhetoric, with expanded multi-section lessons and scored practice for Mandarin, Arabic, and Russian
- Searchable, CEFR-filtered vocabulary libraries with at least 1,000 unique DLPT-oriented words per language, plus vocabulary from grammar and learning-path lessons; practice with level- and topic-filtered flashcards, multiple-choice quizzes, and matching rounds
- CEFR-filtered video and reading resources with audio and comprehension checks; new-language video entries open level-matched YouTube results
- Level-filtered practice activities with browser audio across Pre-A1–C2
- Speech playback controls with pause, resume, and stop; playback prefers an installed enhanced voice when available, while voice quality still depends on the browser and operating system
- Listening transcripts stay hidden until the full passage has played, then can be shown or hidden; regular playback includes an approximate five-second rewind based on browser speech-boundary events
- Reading-and-listening Learn checkpoints unlock every five completed lessons; checkpoint audio is limited to two listens, with no transcript or rewind during the assessment
- A dedicated DLPT-style reading practice area with longer passages and main-idea, detail, inference, purpose, and evidence questions across A1–C2
- Separate DLPT reading and listening tabs with topic and CEFR filters; each language includes three distinct passages per topic at every level across politics, culture, sports, economy, society, and science/technology
- Approximate ILR reading references alongside CEFR levels; the crosswalk is explicitly a study guide, not a DLPT score estimate
- An 18-question placement assessment for each language, spanning beginner through advanced
- Simplified Chinese entries include pinyin; Arabic is Modern Standard Arabic with Arabic-script text and right-to-left display; Russian entries use Cyrillic
- A feedback form for bug reports and improvement ideas, stored in Supabase when configured
- Progress tracking with course and grammar completion, recorded study time, activity milestones, an editable daily goal, and a calendar-based learning streak
- Optional email accounts with per-user cloud-synced progress through Supabase; without account configuration, progress remains saved in the current browser
- Dark mode and browser-persisted progress
- Responsive desktop, tablet, and mobile design

Grammar lesson examples that should appear in Vocabulary use the format `target-language phrase — English translation`; those pairs are extracted and deduplicated automatically. Vocabulary also includes the translated terms attached to Pre-A1 and Learn-path lessons.

The bundled DLPT vocabulary subset was rebuilt from exact shared synsets in Princeton WordNet 3.0 and an independent target-language lexical resource. Every entry includes a short English sense definition and source identifiers; Italian entries are cross-checked against both MultiWordNet and ItalWordNet. The app shows the intended sense and the dictionaries used when a card is revealed. CEFR practice bands are approximate study guidance, ordered with `wordfreq` frequency data; they are not an official vocabulary syllabus or a guarantee that every dictionary equivalent is interchangeable in all contexts.

Source identifiers and attribution:
- `PWN-3.0`: Princeton WordNet 3.0, Princeton University; see the [WordNet license](https://wordnet.princeton.edu/license-and-commercial-use).
- `MCR-SPA`: Spanish Multilingual Central Repository, CC BY 3.0.
- `MWN-ITA`: Italian MultiWordNet, CC BY 3.0; `IWN-ITA`: Italian ItalWordNet, ODC-By 1.0.
- `COW-CMN`: Chinese Open Wordnet; retain its source copyright and disclaimer notices.
- `AWN-ARB`: Arabic WordNet, CC BY-SA 3.0.
- `WIKT-RUS`: Russian Wiktionary-derived entries in Open Multilingual Wordnet, CC BY-SA 3.0. Cite Bond and Foster, 2013, “Linking and extending an open multilingual wordnet,” ACL 2013.

The vocabulary includes adapted material under the applicable source licenses; source identifiers are attached per entry because the five language resources do not all share one license. Frequency ordering uses [wordfreq](https://github.com/rspeer/wordfreq) by Robyn Speer (data under CC BY-SA 4.0); see its [NOTICE](https://github.com/rspeer/wordfreq/blob/master/NOTICE.md) for source-specific attributions, including SUBTLEX contributors, Wikipedia, Leeds Internet Corpus, ParaCrawl, OpenSubtitles, and Google Books Ngrams. Vocabulary added directly by lessons is authored separately and is not part of this dictionary cross-check.

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
3. Run [`supabase/feedback.sql`](./supabase/feedback.sql) in the SQL editor to enable the public feedback form. Visitors can submit without signing in; row-level security allows inserts only, and feedback is not readable from the public app.
4. Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project URL and its public publishable/anon key.
5. Restart `npm run dev`. Open **Account** in the sidebar to create an account or sign in. On a new account, existing browser progress is migrated once; after that, each account keeps separate progress.
6. In Supabase **Authentication → URL Configuration**, allow the local app URL (for example `http://localhost:5173`) and the deployed Cloudflare Pages URL. Email confirmation may be enabled by default.

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
