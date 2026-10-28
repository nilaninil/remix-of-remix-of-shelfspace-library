import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useLibrary } from "@/lib/library-store";
import { daysOverdue, fineFor, formatFine } from "@/lib/circulation";
import { LoanTable } from "@/components/library/LoanTable";
import { StatCard } from "@/components/library/StatCard";

export const Route = createFileRoute("/overdue")({
  head: () => ({
    meta: [
      { title: "Overdue & Fines — ShelfSpace" },
      {
        name: "description",
        content:
          "ShelfSpace overdue members list: due dates, days past due, and accruing fines at ₹5 per day.",
      },
      { property: "og:title", content: "Overdue & Fines — ShelfSpace" },
      {
        property: "og:description",
        content: "Who's late, by how many days, and how much fine has accrued at ₹5 per day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OverduePage,
});

function OverduePage() {
  const { loans, returnLoan } = useLibrary();
  const now = Date.now();

  const overdue = loans
    .filter((loan) => !loan.returnedAt && daysOverdue(loan.dueAt, now) > 0)
    .sort((a, b) => a.dueAt - b.dueAt);

  const totalFine = overdue.reduce((sum, loan) => sum + fineFor(loan.dueAt, now, null), 0);
  const longest = overdue.reduce((max, loan) => Math.max(max, daysOverdue(loan.dueAt, now)), 0);

  const handleReturn = (loanId: string) => {
    returnLoan(loanId);
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
          The Bailiff's Ledger
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Overdue &amp; Fines</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Fines accrue at ₹5 per copy per day past the due date, and stop the moment the book comes back.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="mb-6 grid gap-4 sm:grid-cols-3"
      >
        <StatCard label="Overdue copies" value={overdue.length} hint="not yet returned" />
        <StatCard label="Fines accruing" value={formatFine(totalFine)} hint="₹5 per copy per day" />
        <StatCard label="Longest overdue" value={`${longest} ${longest === 1 ? "day" : "days"}`} hint="past due date" />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <LoanTable
          loans={overdue}
          onReturn={handleReturn}
          emptyMessage="No overdue books — every loan is on time."
        />
      </motion.section>
    </main>
  );
}
