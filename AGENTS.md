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
