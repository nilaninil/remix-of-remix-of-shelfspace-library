import type { Book } from "@/data/books";

export interface CopyState {
  available: number;
  reserved: boolean;
}

export type CirculationAction = "issue" | "return" | "toggleReserve";

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
