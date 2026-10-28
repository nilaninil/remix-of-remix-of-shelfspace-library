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

/**
 * 36 volumes, interleaved by category so an even chunking across the three
 * shelves mixes Fiction, Science, Technology and History on every shelf.
 */
export const BOOKS: Book[] = [
  { id: "pride-and-prejudice", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", spineColor: BURGUNDY, textTone: "gold", height: 202, width: 46, bands: true },
  { id: "brief-history-of-time", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", spineColor: TEAL, textTone: "gold", height: 176, width: 42, bands: false },
  { id: "clean-code", title: "Clean Code", author: "Robert C. Martin", category: "Technology", spineColor: CHOCOLATE, textTone: "gold", height: 184, width: 50, bands: false },
  { id: "guns-germs-steel", title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", spineColor: RUST, textTone: "gold", height: 212, width: 60, bands: true },

  { id: "wuthering-heights", title: "Wuthering Heights", author: "Emily Brontë", category: "Fiction", spineColor: SLATE, textTone: "gold", height: 186, width: 40, bands: false },
  { id: "origin-of-species", title: "The Origin of Species", author: "Charles Darwin", category: "Science", spineColor: OLIVE, textTone: "ink", height: 216, width: 56, bands: true },
  { id: "pragmatic-programmer", title: "The Pragmatic Programmer", author: "Hunt & Thomas", category: "Technology", spineColor: RUST, textTone: "gold", height: 198, width: 58, bands: true },
  { id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", category: "History", spineColor: MUSTARD, textTone: "ink", height: 190, width: 44, bands: false },

  { id: "moby-dick", title: "Moby-Dick", author: "Herman Melville", category: "Fiction", spineColor: NAVY, textTone: "gold", height: 222, width: 62, bands: true },
  { id: "silent-spring", title: "Silent Spring", author: "Rachel Carson", category: "Science", spineColor: SAGE, textTone: "ink", height: 162, width: 38, bands: false },
  { id: "design-of-everyday-things", title: "The Design of Everyday Things", author: "Don Norman", category: "Technology", spineColor: SLATE, textTone: "gold", height: 172, width: 48, bands: false },
  { id: "guns-of-august", title: "The Guns of August", author: "Barbara Tuchman", category: "History", spineColor: BURGUNDY, textTone: "gold", height: 178, width: 48, bands: false },

  { id: "jane-eyre", title: "Jane Eyre", author: "Charlotte Brontë", category: "Fiction", spineColor: FOREST, textTone: "gold", height: 194, width: 44, bands: false },
  { id: "cosmos", title: "Cosmos", author: "Carl Sagan", category: "Science", spineColor: PLUM, textTone: "gold", height: 192, width: 54, bands: false },
  { id: "code-hidden-language", title: "Code: The Hidden Language", author: "Charles Petzold", category: "Technology", spineColor: FOREST, textTone: "gold", height: 208, width: 58, bands: true },
  { id: "spqr", title: "SPQR", author: "Mary Beard", category: "History", spineColor: PLUM, textTone: "gold", height: 154, width: 36, bands: false },

  { id: "the-great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", spineColor: MUSTARD, textTone: "ink", height: 168, width: 40, bands: false },
  { id: "selfish-gene", title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", spineColor: NAVY, textTone: "gold", height: 158, width: 38, bands: false },
  { id: "algorithm-design-manual", title: "The Algorithm Design Manual", author: "Steven Skiena", category: "Technology", spineColor: RUST, textTone: "gold", height: 166, width: 46, bands: false },
  { id: "1491", title: "1491", author: "Charles C. Mann", category: "History", spineColor: RUST, textTone: "gold", height: 192, width: 50, bands: true },

  { id: "1984", title: "1984", author: "George Orwell", category: "Fiction", spineColor: CRIMSON, textTone: "gold", height: 196, width: 44, bands: false },
  { id: "elegant-universe", title: "The Elegant Universe", author: "Brian Greene", category: "Science", spineColor: SLATE, textTone: "gold", height: 198, width: 54, bands: false },
  { id: "mythical-man-month", title: "The Mythical Man-Month", author: "Frederick Brooks", category: "Technology", spineColor: CHOCOLATE, textTone: "gold", height: 172, width: 52, bands: true },
  { id: "silk-roads", title: "The Silk Roads", author: "Peter Frankopan", category: "History", spineColor: MUSTARD, textTone: "ink", height: 206, width: 56, bands: false },

  { id: "to-kill-a-mockingbird", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", spineColor: SAGE, textTone: "ink", height: 184, width: 46, bands: false },
  { id: "immortal-life-henrietta-lacks", title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", category: "Science", spineColor: PLUM, textTone: "gold", height: 190, width: 54, bands: false },
  { id: "soul-of-a-new-machine", title: "The Soul of a New Machine", author: "Tracy Kidder", category: "Technology", spineColor: RUST, textTone: "gold", height: 186, width: 56, bands: true },
  { id: "king-leopolds-ghost", title: "King Leopold's Ghost", author: "Adam Hochschild", category: "History", spineColor: CRIMSON, textTone: "gold", height: 200, width: 48, bands: false },

  { id: "one-hundred-years-of-solitude", title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", category: "Fiction", spineColor: NAVY, textTone: "gold", height: 232, width: 62, bands: true },
  { id: "braiding-sweetgrass", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", category: "Science", spineColor: FOREST, textTone: "gold", height: 176, width: 50, bands: false },
  { id: "hackers-and-painters", title: "Hackers & Painters", author: "Paul Graham", category: "Technology", spineColor: OLIVE, textTone: "ink", height: 164, width: 48, bands: false },
  { id: "postwar", title: "Postwar", author: "Tony Judt", category: "History", spineColor: SLATE, textTone: "gold", height: 236, width: 64, bands: true },

  { id: "east-of-eden", title: "East of Eden", author: "John Steinbeck", category: "Fiction", spineColor: MUSTARD, textTone: "ink", height: 224, width: 58, bands: true },
  { id: "the-body", title: "The Body", author: "Bill Bryson", category: "Science", spineColor: TEAL, textTone: "gold", height: 208, width: 52, bands: false },
  { id: "ghost-in-the-wires", title: "Ghost in the Wires", author: "Kevin Mitnick", category: "Technology", spineColor: SLATE, textTone: "gold", height: 178, width: 44, bands: false },
  { id: "genghis-khan-modern-world", title: "Genghis Khan and the Making of the Modern World", author: "Jack Weatherford", category: "History", spineColor: OLIVE, textTone: "ink", height: 210, width: 60, bands: false },
];
