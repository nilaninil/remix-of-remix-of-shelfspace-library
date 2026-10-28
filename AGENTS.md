<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Conventions

- Bookshelf UI lives in `src/components/shelf/` (Navbar, CategoryFilter, Bookcase, BookSpine); book data in `src/data/books.ts`. Colors/fonts are design tokens in `src/styles.css` — never hardcode colors in components.
- Library state (copy counts, loans, members) lives in the `LibraryProvider` context (`src/lib/library-store.tsx`), mounted once in `__root.tsx`. Loan rules (14-day loans, ₹5/day fines) are pure functions in `src/lib/circulation.ts`; members and seeded loans live in `src/data/library.ts`.
- Library pages are routes `src/routes/{circulation,overdue,dashboard}.tsx` with shared ledger UI in `src/components/library/`. Charts are hand-rolled div/SVG using design tokens — do not add a chart library.
- Mock loan dates are truncated to the UTC day (`TODAY` in `src/data/library.ts`) so SSR and client renders agree; keep new seed dates day-aligned.
