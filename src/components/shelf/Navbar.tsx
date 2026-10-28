import { Library, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Shelf", active: true },
  { label: "Issue / Return", active: false },
  { label: "Overdue", active: false },
  { label: "Dashboard", active: false },
];

interface NavbarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function Navbar({ query, onQueryChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Library className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="truncate font-display text-2xl font-bold tracking-tight">
              ShelfSpace
            </span>
          </a>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search titles or authors…"
            aria-label="Search books"
            className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                link.active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
