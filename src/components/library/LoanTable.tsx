import { useLibrary } from "@/lib/library-store";
import type { Loan } from "@/data/library";
import { daysOverdue, fineFor, formatDate, formatFine } from "@/lib/circulation";
import { cn } from "@/lib/utils";

interface LoanTableProps {
  loans: Loan[];
  onReturn?: (loanId: string) => void;
  emptyMessage: string;
}

interface StatusView {
  label: string;
  tone: "muted" | "forest" | "rust";
}

export function LoanTable({ loans, onReturn, emptyMessage }: LoanTableProps) {
  const { bookById, memberById } = useLibrary();
  const now = Date.now();

  if (loans.length === 0) {
    return <p className="py-8 text-center font-display text-sm italic text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="ledger-table">
        <thead>
          <tr>
            <th scope="col">Book</th>
            <th scope="col">Member</th>
            <th scope="col">Issued</th>
            <th scope="col">Due</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-right">Fine</th>
            {onReturn && <th scope="col" className="text-right">Action</th>}
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const book = bookById(loan.bookId);
            const member = memberById(loan.memberId);
            const overdueDays = daysOverdue(loan.dueAt, loan.returnedAt ?? now);
            const fine = fineFor(loan.dueAt, now, loan.returnedAt);
            const status: StatusView = loan.returnedAt
              ? { label: "Returned", tone: "muted" }
              : overdueDays > 0
                ? { label: `Overdue ${overdueDays}d`, tone: "rust" }
                : { label: "On time", tone: "forest" };
            return (
              <tr key={loan.id}>
                <td>
                  <span className="block font-medium text-foreground">{book?.title ?? loan.bookId}</span>
                  <span className="block text-xs text-muted-foreground">{book?.author}</span>
                </td>
                <td>
                  <span className="block">{member?.name ?? loan.memberId}</span>
                  <span className="block text-xs text-muted-foreground">{member?.email}</span>
                </td>
                <td className="whitespace-nowrap">{formatDate(loan.issuedAt)}</td>
                <td className="whitespace-nowrap">{formatDate(loan.dueAt)}</td>
                <td>
                  <span
                    className={cn(
                      "ledger-chip",
                      status.tone === "forest" && "ledger-chip-forest",
                      status.tone === "rust" && "ledger-chip-rust",
                    )}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="whitespace-nowrap text-right">
                  {fine > 0 ? <strong className="text-destructive">{formatFine(fine)}</strong> : "—"}
                </td>
                {onReturn && (
                  <td className="text-right">
                    {!loan.returnedAt && (
                      <button type="button" className="ledger-return-btn" onClick={() => onReturn(loan.id)}>
                        Return
                      </button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
