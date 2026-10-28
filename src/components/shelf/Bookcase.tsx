import type { Book } from "@/data/books";
import { BookSpine } from "@/components/shelf/BookSpine";

interface BookcaseProps {
  shelves: Book[][];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function ShelfRow({
  books,
  selectedId,
  onSelect,
}: {
  books: Book[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="shelf-row">
      {books.length === 0 ? (
        <p className="empty-shelf-note">No volumes on this shelf match your search.</p>
      ) : (
        <div className="shelf-books">
          {books.map((book) => (
            <BookSpine
              key={book.id}
              book={book}
              selected={book.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
      <div className="shelf-board wood-grain" aria-hidden="true" />
    </div>
  );
}

export function Bookcase({ shelves, selectedId, onSelect }: BookcaseProps) {
  return (
    <div className="bookcase">
      <div className="bookcase-crown wood-grain" aria-hidden="true" />
      <div className="bookcase-interior">
        {shelves.map((books, index) => (
          <ShelfRow key={index} books={books} selectedId={selectedId} onSelect={onSelect} />
        ))}
      </div>
      <div className="bookcase-plinth wood-grain" aria-hidden="true" />
    </div>
  );
}
