import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKS, type Book } from "@/data/books";
import { Navbar } from "@/components/shelf/Navbar";
import { CategoryFilter, type CategoryFilterValue } from "@/components/shelf/CategoryFilter";
import { Bookcase } from "@/components/shelf/Bookcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShelfSpace — Premium Library Management" },
      {
        name: "description",
        content:
          "Browse the ShelfSpace collection on a handcrafted wooden bookshelf — search, filter by category, and pull a volume straight off the shelf.",
      },
      { property: "og:title", content: "ShelfSpace — Premium Library Management" },
      {
        property: "og:description",
        content:
          "A warm, classic library experience: browse three oak shelves, search the collection, and pull a book from the shelf.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SHELF_COUNT = 3;

/** Split books evenly across shelves, preserving reading order. */
function distribute(books: Book[]): Book[][] {
  const base = Math.floor(books.length / SHELF_COUNT);
  const extra = books.length % SHELF_COUNT;
  const shelves: Book[][] = [];
  let cursor = 0;
  for (let i = 0; i < SHELF_COUNT; i++) {
    const size = base + (i < extra ? 1 : 0);
    shelves.push(books.slice(cursor, cursor + size));
    cursor += size;
  }
  return shelves;
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilterValue>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BOOKS.filter(
      (book) =>
        (category === "All" || book.category === category) &&
        (!q ||
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const shelves = useMemo(() => distribute(filtered), [filtered]);
  const selectedBook = BOOKS.find((book) => book.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar query={query} onQueryChange={setQuery} />

      <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-xs font-semibold tracking-[0.35em] text-gold uppercase">
            Est. 2026 · The Reading Room
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The Collection
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Thirty-six volumes hand-picked across three oak shelves. Hover to lift a spine,
            click to pull it forward.
          </p>
        </motion.div>

        <div className="mb-6">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Bookcase
              shelves={shelves}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            />
          </motion.div>
        </div>

        <div className="mt-8 flex min-h-[76px] justify-center">
          <AnimatePresence mode="wait">
            {selectedBook ? (
              <motion.div
                key={selectedBook.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="selected-plate"
              >
                <span className="font-display text-lg font-semibold">{selectedBook.title}</span>
                <span className="text-sm text-muted-foreground">by {selectedBook.author}</span>
                <span className="plate-chip">{selectedBook.category}</span>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-4 text-sm text-muted-foreground italic"
              >
                Select a volume to pull it from the shelf.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
