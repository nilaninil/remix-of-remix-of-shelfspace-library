import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BOOKS } from "@/data/books";
import { MEMBERS } from "@/data/library";
import { useLibrary } from "@/lib/library-store";
import { computeDueDate, formatDate, initialCopies } from "@/lib/circulation";
import { LoanTable } from "@/components/library/LoanTable";

export const Route = createFileRoute("/circulation")({
  head: () => ({
    meta: [
      { title: "Issue & Return — ShelfSpace" },
      {
        name: "description",
        content:
          "The ShelfSpace front desk: issue books to members with 14-day due dates, process returns, and track ₹5-per-day overdue fines.",
      },
      { property: "og:title", content: "Issue & Return — ShelfSpace" },
      {
        property: "og:description",
        content: "Issue with 14-day due dates, take returns, and track overdue fines at the front desk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CirculationPage,
});

function CirculationPage() {
  const { copies, loans, members, issue, returnLoan } = useLibrary();
  const [memberId, setMemberId] = useState(MEMBERS[0].id);
  const [bookChoice, setBookChoice] = useState("");
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  const activeLoans = useMemo(() => loans.filter((loan) => !loan.returnedAt), [loans]);

  const selectable = useMemo(
    () =>
      BOOKS.filter((book) => (copies[book.id] ?? initialCopies(book)).available > 0).sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
    [copies],
  );
  const bookId = selectable.some((book) => book.id === bookChoice)
    ? bookChoice
    : (selectable[0]?.id ?? "");

  const duePreview = formatDate(computeDueDate(Date.now()));

  const handleIssue = () => {
    if (!bookId) {
      setNote({ ok: false, text: "Every copy is on loan right now — return something first." });
      return;
    }
    const result = issue(bookId, memberId);
    setNote({ ok: result.ok, text: result.message ?? (result.ok ? "Issued." : "Could not issue this book.") });
  };

  const handleReturn = (loanId: string) => {
    const result = returnLoan(loanId);
    setNote({ ok: result.ok, text: result.message ?? (result.ok ? "Returned." : "Could not process this return.") });
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="mb-2 text-xs font-semibold tracking-[0.35em] text-gold uppercase">
          Front Desk
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Issue &amp; Return</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Loans run for 14 days; overdue copies accrue a fine of ₹5 per day.
        </p>
      </motion.div>

      {note && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className={`form-note mb-6 ${note.ok ? "form-note-ok" : "form-note-err"}`}
        >
          {note.text}
        </motion.p>
      )}

      <div className="flex flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <h2 className="font-display text-xl font-bold">Issue a book</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-end">
            <label className="block">
              <span className="field-label">Member</span>
              <select
                value={memberId}
                onChange={(event) => setMemberId(event.target.value)}
                className="lib-select"
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="field-label">Book (on the shelf)</span>
              <select
                value={bookId}
                onChange={(event) => setBookChoice(event.target.value)}
                className="lib-select"
                disabled={selectable.length === 0}
                aria-disabled={selectable.length === 0}
              >
                {selectable.length === 0 ? (
                  <option value="">No copies available to issue</option>
                ) : (
                  selectable.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} — {(copies[book.id] ?? initialCopies(book)).available} on shelf
                    </option>
                  ))
                )}
              </select>
            </label>
            <button
              type="button"
              onClick={handleIssue}
              disabled={!bookId}
              className="h-10 rounded-xl bg-forest px-5 text-sm font-semibold uppercase tracking-wider text-cream shadow-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Issue book
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Due date for anything issued today: <strong className="text-foreground">{duePreview}</strong>
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-bold">Active loans</h2>
            <span className="text-xs text-muted-foreground">{activeLoans.length} copies out</span>
          </div>
          <LoanTable
            loans={activeLoans}
            onReturn={handleReturn}
            emptyMessage="Nothing is on loan — every copy sits on the shelf."
          />
        </motion.section>
      </div>
    </main>
  );
}
