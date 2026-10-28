export type Category = "Fiction" | "Science" | "Technology" | "History";

/** Gold for dark spines, ink for light spines. */
export type SpineText = "gold" | "ink";

export interface Book {
  /** Stable, human-readable id — safe to persist or link against later. */
  id: string;
  title: string;
  author: string;
  category: Category;
  /** CSS color value; use the --spine-* tokens from the design system. */
  spineColor: string;
  textTone: SpineText;
  /** Spine dimensions in px. */
  height: number;
  width: number;
  /** Double gold bands near the caps. */
  bands: boolean;
}

const BURGUNDY = "var(--spine-burgundy)";
const NAVY = "var(--spine-navy)";
const FOREST = "var(--spine-forest)";
const MUSTARD = "var(--spine-mustard)";
const RUST = "var(--spine-rust)";
const PLUM = "var(--spine-plum)";
const TEAL = "var(--spine-teal)";
const CHOCOLATE = "var(--spine-chocolate)";
const OLIVE = "var(--spine-olive)";
const SLATE = "var(--spine-slate)";
const CRIMSON = "var(--spine-crimson)";
const SAGE = "var(--spine-sage)";

export const BOOKS: Book[] = [
  { id: "pride-and-prejudice", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", spineColor: BURGUNDY, textTone: "gold", height: 202, width: 44, bands: true },
  { id: "wuthering-heights", title: "Wuthering Heights", author: "Emily Brontë", category: "Fiction", spineColor: SLATE, textTone: "gold", height: 186, width: 38, bands: false },
  { id: "moby-dick", title: "Moby-Dick", author: "Herman Melville", category: "Fiction", spineColor: NAVY, textTone: "gold", height: 222, width: 48, bands: true },
  { id: "jane-eyre", title: "Jane Eyre", author: "Charlotte Brontë", category: "Fiction", spineColor: FOREST, textTone: "gold", height: 194, width: 40, bands: false },
  { id: "the-great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", spineColor: MUSTARD, textTone: "ink", height: 168, width: 36, bands: false },
  { id: "crime-and-punishment", title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Fiction", spineColor: CRIMSON, textTone: "gold", height: 230, width: 50, bands: true },

  { id: "brief-history-of-time", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", spineColor: TEAL, textTone: "gold", height: 176, width: 40, bands: false },
  { id: "origin-of-species", title: "The Origin of Species", author: "Charles Darwin", category: "Science", spineColor: OLIVE, textTone: "ink", height: 216, width: 44, bands: true },
  { id: "silent-spring", title: "Silent Spring", author: "Rachel Carson", category: "Science", spineColor: SAGE, textTone: "ink", height: 162, width: 34, bands: false },
  { id: "cosmos", title: "Cosmos", author: "Carl Sagan", category: "Science", spineColor: PLUM, textTone: "gold", height: 192, width: 42, bands: false },
  { id: "selfish-gene", title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", spineColor: NAVY, textTone: "gold", height: 158, width: 34, bands: false },

  { id: "clean-code", title: "Clean Code", author: "Robert C. Martin", category: "Technology", spineColor: CHOCOLATE, textTone: "gold", height: 184, width: 44, bands: false },
  { id: "pragmatic-programmer", title: "The Pragmatic Programmer", author: "Hunt & Thomas", category: "Technology", spineColor: RUST, textTone: "gold", height: 198, width: 46, bands: true },
  { id: "design-of-everyday-things", title: "The Design of Everyday Things", author: "Don Norman", category: "Technology", spineColor: SLATE, textTone: "gold", height: 172, width: 38, bands: false },
  { id: "code-hidden-language", title: "Code: The Hidden Language", author: "Charles Petzold", category: "Technology", spineColor: FOREST, textTone: "gold", height: 208, width: 44, bands: true },
  { id: "algorithm-design-manual", title: "The Algorithm Design Manual", author: "Steven Skiena", category: "Technology", spineColor: RUST, textTone: "gold", height: 166, width: 36, bands: false },

  { id: "guns-germs-steel", title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", spineColor: RUST, textTone: "gold", height: 212, width: 46, bands: true },
  { id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", category: "History", spineColor: MUSTARD, textTone: "ink", height: 190, width: 40, bands: false },
  { id: "guns-of-august", title: "The Guns of August", author: "Barbara Tuchman", category: "History", spineColor: BURGUNDY, textTone: "gold", height: 178, width: 38, bands: false },
  { id: "spqr", title: "SPQR", author: "Mary Beard", category: "History", spineColor: PLUM, textTone: "gold", height: 154, width: 34, bands: false },
];
