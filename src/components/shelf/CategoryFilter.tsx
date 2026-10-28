import { BOOKS } from "@/data/books";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Fiction", "Science", "Technology", "History"] as const;
export type CategoryFilterValue = (typeof FILTERS)[number];

interface CategoryFilterProps {
  active: CategoryFilterValue;
  onChange: (category: CategoryFilterValue) => void;
}

function counts(): Record<string, number> {
  const result: Record<string, number> = { All: BOOKS.length };
  for (const book of BOOKS) {
    result[book.category] = (result[book.category] ?? 0) + 1;
  }
  return result;
}

const COUNTS = counts();

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter books by category">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={active === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            active === filter
              ? "border-forest bg-forest text-cream shadow-md"
              : "border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground",
          )}
        >
          {filter}
          <span className="ml-1.5 text-xs opacity-70">{COUNTS[filter]}</span>
        </button>
      ))}
    </div>
  );
}
