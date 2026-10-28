import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { BOOKS, type Book } from "@/data/books";
import { INITIAL_LOANS, MEMBERS, type Loan, type Member } from "@/data/library";
import {
  adjustCopies,
  computeDueDate,
  daysOverdue,
  formatDate,
  formatFine,
  FINE_PER_DAY,
  initialCopies,
  type CopyState,
} from "./circulation";

export interface ActionResult {
  ok: boolean;
  message?: string;
}

interface LibraryContextValue {
  copies: Record<string, CopyState>;
  loans: Loan[];
  members: Member[];
  bookById: (id: string) => Book | undefined;
  memberById: (id: string) => Member | undefined;
  /** Issues one copy of a book to a member; refuses when no copy is available. */
  issue: (bookId: string, memberId: string) => ActionResult;
  /** Returns a specific loan, freezing its fine at the return date. */
  returnLoan: (loanId: string) => ActionResult;
  /** Returns the oldest active loan of a book (used by the shelf overlay). */
  returnCopyForBook: (bookId: string) => ActionResult;
  toggleReserve: (bookId: string) => void;
}

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [copies, setCopies] = useState<Record<string, CopyState>>(() =>
    Object.fromEntries(BOOKS.map((book) => [book.id, initialCopies(book)])),
  );
  const [loans, setLoans] = useState<Loan[]>(INITIAL_LOANS);

  const bookById = useCallback(
    (id: string) => BOOKS.find((book) => book.id === id),
    [],
  );
  const memberById = useCallback(
    (id: string) => MEMBERS.find((member) => member.id === id),
    [],
  );

  const issue = useCallback(
    (bookId: string, memberId: string): ActionResult => {
      const book = BOOKS.find((b) => b.id === bookId);
      const member = MEMBERS.find((m) => m.id === memberId);
      if (!book || !member) return { ok: false, message: "Choose both a member and a book." };
      const state = copies[bookId] ?? initialCopies(book);
      if (state.available <= 0) {
        return { ok: false, message: `No copies of “${book.title}” are on the shelf right now.` };
      }
      const now = Date.now();
      setCopies((prev) => ({
        ...prev,
        [bookId]: { ...state, available: state.available - 1 },
      }));
      setLoans((prev) => [
        {
          id: `loan-${now}-${bookId}`,
          bookId,
          memberId,
          issuedAt: now,
          dueAt: computeDueDate(now),
          returnedAt: null,
        },
        ...prev,
      ]);
      return {
        ok: true,
        message: `Issued to ${member.name} — due back ${formatDate(computeDueDate(now))}.`,
      };
    },
    [copies],
  );

  const returnLoan = useCallback(
    (loanId: string): ActionResult => {
      const loan = loans.find((l) => l.id === loanId);
      if (!loan) return { ok: false, message: "That loan doesn't exist." };
      if (loan.returnedAt) return { ok: false, message: "That copy was already returned." };
      const book = BOOKS.find((b) => b.id === loan.bookId);
      if (!book) return { ok: false, message: "That loan points at an unknown book." };
      const returnedAt = Date.now();
      const fine = daysOverdue(loan.dueAt, returnedAt) * FINE_PER_DAY;
      setLoans((prev) =>
        prev.map((l) => (l.id === loanId ? { ...l, returnedAt } : l)),
      );
      setCopies((prev) => ({
        ...prev,
        [loan.bookId]: adjustCopies(prev[loan.bookId], book, "return"),
      }));
      return {
        ok: true,
        message:
          `“${book.title}” returned.` +
          (fine > 0 ? ` Fine due: ${formatFine(fine)} (₹${FINE_PER_DAY}/day).` : ""),
      };
    },
    [loans],
  );

  const returnCopyForBook = useCallback(
    (bookId: string): ActionResult => {
      const active = loans
        .filter((l) => l.bookId === bookId && !l.returnedAt)
        .sort((a, b) => a.issuedAt - b.issuedAt);
      if (!active.length) {
        return { ok: false, message: "No issued copies of that book to return." };
      }
      return returnLoan(active[0].id);
    },
    [loans, returnLoan],
  );

  const toggleReserve = useCallback((bookId: string) => {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return;
    setCopies((prev) => ({
      ...prev,
      [bookId]: adjustCopies(prev[bookId], book, "toggleReserve"),
    }));
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        copies,
        loans,
        members: MEMBERS,
        bookById,
        memberById,
        issue,
        returnLoan,
        returnCopyForBook,
        toggleReserve,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary(): LibraryContextValue {
  const value = useContext(LibraryContext);
  if (!value) throw new Error("useLibrary must be used inside <LibraryProvider>.");
  return value;
}
