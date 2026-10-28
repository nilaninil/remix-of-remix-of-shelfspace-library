import { describe, expect, it } from "vitest";

import { BOOKS } from "@/data/books";
import { adjustCopies, initialCopies } from "@/lib/circulation";

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
