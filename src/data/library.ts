import type { Category } from "./books";
import { BOOKS } from "./books";
import { computeDueDate, DAY_MS } from "@/lib/circulation";

export const CATEGORIES: Category[] = ["Fiction", "Science", "Technology", "History"];

export interface Member {
  id: string;
  name: string;
  email: string;
}

/** Mock membership roll. */
export const MEMBERS: Member[] = [
  { id: "m1", name: "Aarav Mehta", email: "aarav.mehta@example.com" },
  { id: "m2", name: "Priya Nair", email: "priya.nair@example.com" },
  { id: "m3", name: "Rohan Gupta", email: "rohan.gupta@example.com" },
  { id: "m4", name: "Sara Iyer", email: "sara.iyer@example.com" },
  { id: "m5", name: "Devika Rao", email: "devika.rao@example.com" },
  { id: "m6", name: "Kabir Singh", email: "kabir.singh@example.com" },
];

/** Stand-in member used when a book is issued straight from the shelf overlay. */
export const WALK_IN: Member = { id: "walk-in", name: "Walk-in visitor", email: "—" };

export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  issuedAt: number;
  dueAt: number;
  returnedAt: number | null;
}

/** Mock "today", truncated to the UTC day so seeded dates stay stable across SSR and hydration. */
export const TODAY = Math.floor(Date.now() / DAY_MS) * DAY_MS;

/**
 * One active loan for every copy that books.ts marks as off the shelf
 * (copiesTotal − copiesAvailable), staggered over the past three weeks so a
 * natural slice runs overdue.
 */
function seedActiveLoans(): Loan[] {
  const loans: Loan[] = [];
  let n = 0;
  for (const book of BOOKS) {
    const activeCount = book.copiesTotal - book.copiesAvailable;
    for (let i = 0; i < activeCount; i++) {
      const daysAgo = 2 + ((n * 7) % 19); // 2–20 days ago; beyond 14 means overdue
      const issuedAt = TODAY - daysAgo * DAY_MS;
      loans.push({
        id: `seed-${book.id}-${i}`,
        bookId: book.id,
        memberId: MEMBERS[n % MEMBERS.length].id,
        issuedAt,
        dueAt: computeDueDate(issuedAt),
        returnedAt: null,
      });
      n++;
    }
  }
  return loans;
}

/** Returned history, feeding the dashboard's issue and fine charts. */
function seedReturnedLoans(): Loan[] {
  const loans: Loan[] = [];
  for (let i = 0; i < BOOKS.length; i += 3) {
    const book = BOOKS[i];
    const daysAgo = 6 + ((i / 3) % 5) * 3; // 6–18 days ago
    const issuedAt = TODAY - daysAgo * DAY_MS;
    const heldDays = 3 + ((i / 3) % 4); // kept for 3–6 days
    const overdueReturn = i % 12 === 0; // every fourth history loan came back late
    const returnedAt = overdueReturn
      ? computeDueDate(issuedAt) + (2 + (i % 3)) * DAY_MS
      : issuedAt + heldDays * DAY_MS;
    loans.push({
      id: `seed-ret-${book.id}`,
      bookId: book.id,
      memberId: MEMBERS[i % MEMBERS.length].id,
      issuedAt,
      dueAt: computeDueDate(issuedAt),
      returnedAt,
    });
  }
  return loans;
}

export const INITIAL_LOANS: Loan[] = [...seedActiveLoans(), ...seedReturnedLoans()];
