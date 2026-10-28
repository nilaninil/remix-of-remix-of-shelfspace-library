import { motion, type MotionStyle } from "framer-motion";
import type { Book } from "@/data/books";
import { cn } from "@/lib/utils";

interface BookSpineProps {
  book: Book;
  selected: boolean;
  onSelect: (id: string) => void;
}

/** Longer titles get a smaller size so they stay fully visible on the spine. */
function titleFontSize(title: string): number {
  if (title.length > 22) return 10;
  if (title.length > 14) return 12;
  return 14;
}

export function BookSpine({ book, selected, onSelect }: BookSpineProps) {
  const showAuthor = book.width >= 44 && book.height >= 180 && book.author.length <= 18;

  return (
    <motion.button
      type="button"
      aria-label={`${book.title} by ${book.author}`}
      aria-pressed={selected}
      data-bands={book.bands ? "double" : "plain"}
      data-tone={book.textTone}
      onClick={() => onSelect(book.id)}
      initial={false}
      whileHover={{ y: -12, scale: 1.05, zIndex: 20 }}
      animate={selected ? { y: -30, scale: 1.14, rotate: -1.5 } : { y: 0, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cn("book-spine origin-bottom shrink-0", selected && "book-spine-selected")}
      style={
        {
          height: book.height,
          width: book.width,
          "--spine-color": book.spineColor,
          zIndex: selected ? 30 : 1,
        } as MotionStyle
      }
    >
      <span className="spine-title" style={{ fontSize: titleFontSize(book.title) }}>
        {book.title}
      </span>
      {showAuthor && <span className="spine-author">{book.author}</span>}
    </motion.button>
  );
}
