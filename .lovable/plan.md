## Goal

Recreate Anthony James Hiscock's CV site (makeitstatic.github.io) here in Lovable so you can freely edit content, add new sections, and re-style it. This is **step 1** — get a faithful starting point on screen. Then you'll tell me what to change/add and we iterate.

## What I'll build

A single-page resume with a fixed left sidebar (profile photo + section nav) and stacked content sections on the right, matching the original layout:

```text
┌──────────┬─────────────────────────────┐
│  [photo] │  ABOUT      (hero)          │
│          │  ─────                      │
│  About   │  EXPERIENCE                 │
│  Exper.  │  ─────                      │
│  Educ.   │  EDUCATION                  │
│  Skills  │  ─────                      │
│  Inter.  │  SKILLS                     │
│          │  ─────                      │
│ socials  │  INTERESTS                  │
└──────────┴─────────────────────────────┘
```

Content ported over verbatim from the live site:
- **About** — name, location, phone, email, tagline, LinkedIn / GitHub / Instagram / Facebook icons
- **Experience** — DevOps Engineer (Nedbank), Software Engineering Intern (iOCO), Commercial Model (Select Models), Brand Representative (Firewalk Marketing)
- **Education** — Belgium Campus IT-University, Hoërskool Montana
- **Skills** — Programming languages/tools list + Workflow list
- **Interests** — the outdoors / photography paragraph

Behaviour:
- Sidebar nav scrolls smoothly to each section and highlights the active one
- Responsive: sidebar collapses to a top bar on mobile
- Same visual feel as the original (dark sidebar, white content area, orange accent on the surname and email link)

## What I'm NOT doing yet

- No content rewrites, no new sections, no design overhaul — that's the next round once you tell me what to change.
- Not pushing back to your GitHub repo. Edits live in this Lovable project; you can publish from here or copy the built output back to the repo later.
- Not copying the profile photo from the original site (I'll use a placeholder avatar; swap in your own image whenever you're ready).

## Technical notes

- TanStack Start single route at `/` (`src/routes/index.tsx`) containing all sections with anchor ids (`#about`, `#experience`, …).
- Sidebar built as a plain fixed-position component (not shadcn `Sidebar`) to match the original's always-visible profile-photo style.
- Colors added as semantic tokens in `src/styles.css` (dark sidebar bg, orange accent ~ `#bd5d38`) so restyling later is a one-place change.
- Icons via `lucide-react` (Linkedin, Github, Instagram, Facebook) — already available.
- Page metadata (title, description, og tags) updated in the route's `head()`.

## After this lands

Tell me which sections you want to update or add and we'll go through them one by one.
