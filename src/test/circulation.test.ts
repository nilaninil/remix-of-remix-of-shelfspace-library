import { describe, expect, it } from "vitest";

import { BOOKS } from "@/data/books";
import {
  adjustCopies,
  canIssue,
  computeDueDate,
  daysOverdue,
  fineFor,
  formatFine,
  initialCopies,
  DAY_MS,
  FINE_PER_DAY,
  LOAN_PERIOD_DAYS,
} from "@/lib/circulation";

const gunsOfAugust = BOOKS.find((b) => b.id === "guns-of-august")!; // 1 of 2 available
const silentSpring = BOOKS.find((b) => b.id === "silent-spring")!; // 0 of 2 available

describe("circulation copy counts", () => {
  it("issues a copy and never below zero", () => {
    let state = initialCopies(gunsOfAugust);
    state = adjustCopies(state, gunsOfAugust, "issue");
    expect(state.available).toBe(0);
    state = adjustCopies(state, gunsOfAugust, "issue");
    expect(state.available).toBe(0);
  });

  it("returns a copy and never above the total", () => {
    let state = initialCopies(silentSpring);
    expect(state.available).toBe(0);
    state = adjustCopies(state, silentSpring, "return");
    expect(state.available).toBe(1);
    state = adjustCopies(state, silentSpring, "return");
    state = adjustCopies(state, silentSpring, "return");
    expect(state.available).toBe(2);
    state = adjustCopies(state, silentSpring, "return");
    expect(state.available).toBe(2);
  });

  it("toggles a reservation off and on", () => {
    const reserved = adjustCopies(initialCopies(gunsOfAugust), gunsOfAugust, "toggleReserve");
    expect(reserved.reserved).toBe(true);
    const released = adjustCopies(reserved, gunsOfAugust, "toggleReserve");
    expect(released.reserved).toBe(false);
  });

  it("starts from the book's mock availability", () => {
    expect(initialCopies(silentSpring)).toEqual({ available: 0, reserved: false });
  });
});

describe("loan rules", () => {
  it("makes every loan due exactly 14 days after issue", () => {
    expect(LOAN_PERIOD_DAYS).toBe(14);
    const issuedAt = Date.UTC(2026, 9, 28);
    expect(computeDueDate(issuedAt)).toBe(issuedAt + 14 * DAY_MS);
  });

  it("accrues fines at ₹5 per overdue day", () => {
    expect(FINE_PER_DAY).toBe(5);
    const dueAt = Date.UTC(2026, 9, 14);
    expect(daysOverdue(dueAt, dueAt + 3 * DAY_MS)).toBe(3);
    expect(fineFor(dueAt, dueAt + 3 * DAY_MS, null)).toBe(15);
    expect(fineFor(dueAt, dueAt, null)).toBe(0);
  });

  it("freezes the fine when a loan is returned", () => {
    const dueAt = Date.UTC(2026, 9, 14);
    const returnedAt = dueAt + 5 * DAY_MS;
    // Even a long time later, the fine stays at what it was on the return day.
    expect(fineFor(dueAt, returnedAt + 40 * DAY_MS, returnedAt)).toBe(25);
  });

  it("formats fines in rupees", () => {
    expect(formatFine(15)).toBe("₹15");
    expect(formatFine(0)).toBe("₹0");
  });
});

describe("action validation", () => {
  it("blocks issuing when no copies are available", () => {
    expect(canIssue(undefined, silentSpring)).toBe(false);
    expect(canIssue({ available: 0, reserved: false }, silentSpring)).toBe(false);
    expect(canIssue({ available: 1, reserved: false }, gunsOfAugust)).toBe(true);
  });
});
