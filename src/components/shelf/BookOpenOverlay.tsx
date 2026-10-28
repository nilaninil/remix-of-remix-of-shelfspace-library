import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, BookOpen, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Book } from "@/data/books";
import type { CopyState } from "@/lib/circulation";
import { cn } from "@/lib/utils";

interface BookOpenOverlayProps {
  book: Book;
  copies: CopyState;
  onIssue: (id: string) => void;
  onReturn: (id: string) => void;
  onToggleReserve: (id: string) => void;
  onClose: () => void;
}

const CLOSE_DURATION = 700;

export function BookOpenOverlay({
  book,
  copies,
  onIssue,
  onReturn,
  onToggleReserve,
  onClose,
}: BookOpenOverlayProps) {
  const [coverOpen, setCoverOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // Let the spread settle in, then swing the cover open.
  useEffect(() => {
    const timer = setTimeout(() => setCoverOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    setCoverOpen(false);
    setTimeout(onClose, CLOSE_DURATION);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // requestClose is stable enough for the overlay's lifetime; closing guards re-entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing]);

  const allIssued = copies.available === 0;
  const allOnShelf = copies.available === book.copiesTotal;
  const status = copies.reserved ? "reserved" : allIssued ? "issued" : "available";
  const statusLabel = copies.reserved
    ? "Reserved by you"
    : allIssued
      ? "All copies issued"
      : "Available";
  const displayTitle = book.spineTitle ?? book.title;

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={requestClose} aria-hidden="true" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${book.title} details`}
        className="book-spread"
        initial={{ scale: 0.85, y: 36, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <motion.div
          className="spread-pages"
          initial={{ opacity: 0 }}
          animate={{ opacity: coverOpen ? 1 : 0 }}
          transition={{ duration: 0.3, delay: coverOpen ? 0.45 : 0 }}
        >
          {/* Left page: cover, title, author, category */}
          <div className="spread-page spread-page-left">
            <div className="flex h-full flex-col items-center text-center">
              <div
                className="mini-cover"
                style={{ "--book-color": book.spineColor } as React.CSSProperties}
                data-tone={book.textTone}
              >
                <span className="mini-cover-title">{displayTitle}</span>
                <span className="mini-cover-author">{book.author}</span>
                <span className="mini-cover-imprint">SHELFSPACE</span>
              </div>
              <h2 className="page-title">{book.title}</h2>
              <p className="page-author">by {book.author}</p>
              <span className="plate-chip mt-2">{book.category}</span>
            </div>
          </div>

          <div className="spread-gutter" aria-hidden="true" />

          {/* Right page: description, catalog data, circulation actions */}
          <div className="spread-page spread-page-right">
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="page-kicker">Book details</span>
                <span className="status-chip" data-status={status}>
                  {statusLabel}
                </span>
              </div>
              <p className="page-description">{book.description}</p>
              <dl className="detail-grid">
                <div>
                  <dt>ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div>
                  <dt>Shelf location</dt>
                  <dd>{book.location}</dd>
                </div>
                <div>
                  <dt>Copies</dt>
                  <dd>
                    {copies.available} of {book.copiesTotal} on the shelf
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{statusLabel}</dd>
                </div>
              </dl>
              <div className="mt-auto grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onIssue(book.id)}
                  disabled={allIssued}
                  className="action-btn action-issue"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Issue
                </button>
                <button
                  type="button"
                  onClick={() => onToggleReserve(book.id)}
                  className={cn("action-btn action-reserve", copies.reserved && "action-reserved")}
                >
                  {copies.reserved ? (
                    <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copies.reserved ? "Reserved" : "Reserve"}
                </button>
                <button
                  type="button"
                  onClick={() => onReturn(book.id)}
                  disabled={allOnShelf}
                  className="action-btn action-return"
                >
                  <Undo2 className="h-4 w-4" aria-hidden="true" />
                  Return
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Front cover: starts centered over the spread, hinges open to the left */}
        <motion.div
          className="spread-cover"
          style={{ transformOrigin: "left center" }}
          initial={{ rotateY: 0, x: "-50%" }}
          // Once open, the cover fades out so it doesn't sit over the left page.
          animate={
            coverOpen
              ? { rotateY: -180, x: 0, opacity: [1, 1, 0] }
              : { rotateY: 0, x: "-50%", opacity: 1 }
          }
          transition={{
            duration: 0.85,
            ease: [0.6, 0.05, 0.3, 1],
            delay: coverOpen ? 0.15 : 0,
            times: coverOpen ? [0, 0.7, 1] : undefined,
          }}
        >
          <div
            className="cover-face cover-front"
            style={{ "--book-color": book.spineColor } as React.CSSProperties}
            data-tone={book.textTone}
          >
            <span className="cover-title">{displayTitle}</span>
            <span className="cover-author">{book.author}</span>
            <span className="cover-imprint">SHELFSPACE · EST. 2026</span>
          </div>
          <div className="cover-face cover-back" aria-hidden="true" />
        </motion.div>

        <button
          type="button"
          onClick={requestClose}
          className="spread-close"
          aria-label="Close book and return it to the shelf"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}
