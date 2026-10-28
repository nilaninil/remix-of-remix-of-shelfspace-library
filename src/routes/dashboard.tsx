import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BOOKS } from "@/data/books";
import { CATEGORIES } from "@/data/library";
import { useLibrary } from "@/lib/library-store";
import { daysOverdue, fineFor, formatFine, initialCopies, DAY_MS } from "@/lib/circulation";
import { StatCard } from "@/components/library/StatCard";
import { HBarChart, VBarChart, type HBarRow } from "@/components/library/charts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ShelfSpace" },
      {
        name: "description",
        content:
          "ShelfSpace dashboard: live stats and charts for the collection, issues, overdue copies, and accruing fines.",
      },
      { property: "og:title", content: "Dashboard — ShelfSpace" },
      {
        property: "og:description",
        content: "Collection, circulation and fines at a glance — books, issues, and overdue items.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { copies, loans, members, bookById } = useLibrary();
  const now = Date.now();

  const totalCopies = BOOKS.reduce((sum, book) => sum + book.copiesTotal, 0);
  const onShelf = BOOKS.reduce(
    (sum, book) => sum + (copies[book.id] ?? initialCopies(book)).available,
    0,
  );
  const issued = totalCopies - onShelf;

  const activeLoans = loans.filter((loan) => !loan.returnedAt);
  const overdueLoans = activeLoans.filter((loan) => daysOverdue(loan.dueAt, now) > 0);
  const finesAccrued = loans.reduce(
    (sum, loan) => sum + fineFor(loan.dueAt, now, loan.returnedAt),
    0,
  );

  const categoryRows: HBarRow[] = CATEGORIES.map((category) => {
    const books = BOOKS.filter((book) => book.category === category);
    const shelf = books.reduce(
      (sum, book) => sum + (copies[book.id] ?? initialCopies(book)).available,
      0,
    );
    const total = books.reduce((sum, book) => sum + book.copiesTotal, 0);
    return {
      label: category,
      segments: [
        { value: shelf, tone: "gold" },
        { value: total - shelf, tone: "wood" },
      ],
      caption: `${total} copies`,
    };
  });

  const overdueRows: HBarRow[] = CATEGORIES.map((category) => {
    const late = overdueLoans.filter((loan) => bookById(loan.bookId)?.category === category);
    const fine = late.reduce((sum, loan) => sum + fineFor(loan.dueAt, now, null), 0);
    return {
      label: category,
      segments: [{ value: late.length, tone: "destructive" }],
      caption: late.length ? `${late.length} · ${formatFine(fine)}` : "—",
    };
  });

  const todayBucket = Math.floor(now / DAY_MS);
  const dayLabel = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const issuesByDay = Array.from({ length: 14 }, (_, i) => {
    const bucket = todayBucket - 13 + i;
    return {
      label: dayLabel.format(bucket * DAY_MS),
      value: loans.filter((loan) => Math.floor(loan.issuedAt / DAY_MS) === bucket).length,
    };
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-10 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="mb-2 text-xs font-semibold tracking-[0.35em] text-gold uppercase">
          The Librarian's Desk
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Dashboard</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          The collection, circulation, and fines at a glance — updated the moment a book moves.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        <StatCard label="Titles" value={BOOKS.length} hint="across 4 categories" />
        <StatCard label="On the shelf" value={onShelf} hint={`of ${totalCopies} copies`} />
        <StatCard label="Copies issued" value={issued} hint="currently on loan" />
        <StatCard label="Members" value={members.length} hint="on the roll" />
        <StatCard label="Overdue" value={overdueLoans.length} hint="copies past due" />
        <StatCard label="Fines accrued" value={formatFine(finesAccrued)} hint="₹5 per day" />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <h2 className="mb-4 font-display text-xl font-bold">Copies by category</h2>
          <HBarChart
            rows={categoryRows}
            ariaLabel="Copies by category, split between on-shelf and issued"
            legend={[
              { tone: "gold", label: "On shelf" },
              { tone: "wood", label: "Issued" },
            ]}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <h2 className="mb-4 font-display text-xl font-bold">Overdue by category</h2>
          <HBarChart
            rows={overdueRows}
            ariaLabel="Overdue copies and accruing fines by category"
            legend={[{ tone: "destructive", label: "Overdue copies (count · fines)" }]}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2"
        >
          <h2 className="mb-4 font-display text-xl font-bold">Issues — last 14 days</h2>
          <VBarChart data={issuesByDay} ariaLabel="Books issued per day over the last 14 days" />
        </motion.section>
      </div>
    </main>
  );
}
