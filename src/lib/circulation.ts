import type { Book } from "@/data/books";

export interface CopyState {
  available: number;
  reserved: boolean;
}

export type CirculationAction = "issue" | "return" | "toggleReserve";

/** Loan rules for the mock library. */
export const LOAN_PERIOD_DAYS = 14;
/** Overdue fine in ₹ per started day past due. */
export const FINE_PER_DAY = 5;

export const DAY_MS = 86_400_000;

export function initialCopies(book: Book): CopyState {
  return { available: book.copiesAvailable, reserved: false };
}

/**
 * Pure local circulation logic (mock, no backend): issue a copy, return a copy,
 * or toggle a reservation. Counts are clamped to the book's copy totals.
 */
export function adjustCopies(
  current: CopyState | undefined,
  book: Book,
  action: CirculationAction,
): CopyState {
  const state = current ?? initialCopies(book);
  switch (action) {
    case "issue":
      return { ...state, available: Math.max(0, state.available - 1) };
    case "return":
      return { ...state, available: Math.min(book.copiesTotal, state.available + 1) };
    case "toggleReserve":
      return { ...state, reserved: !state.reserved };
  }
}

/** A loan is due exactly 14 days after it is issued. */
export function computeDueDate(issuedAt: number): number {
  return issuedAt + LOAN_PERIOD_DAYS * DAY_MS;
}

/** Whole started days past due as of `asOf` (0 when on time). */
export function daysOverdue(dueAt: number, asOf: number): number {
  if (asOf <= dueAt) return 0;
  return Math.ceil((asOf - dueAt) / DAY_MS);
}

/**
 * Fine accrued on a loan as of `asOf`. A returned loan stops accruing at its
 * return date, so pass `returnedAt` to freeze the fine.
 */
export function fineFor(dueAt: number, asOf: number, returnedAt: number | null): number {
  return daysOverdue(dueAt, returnedAt ?? asOf) * FINE_PER_DAY;
}

/** A copy can only be issued while at least one copy sits on the shelf. */
export function canIssue(state: CopyState | undefined, book: Book): boolean {
  return (state ?? initialCopies(book)).available > 0;
}

/** A copy can only be returned while some copy of the book is still out. */
export function canReturn(state: CopyState | undefined, book: Book): boolean {
  return (state ?? initialCopies(book)).available < book.copiesTotal;
}

export function formatFine(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(ts: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(ts));
}
