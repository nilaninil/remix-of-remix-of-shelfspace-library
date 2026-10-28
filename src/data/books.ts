export type Category = "Fiction" | "Science" | "Technology" | "History";

/** Gold for dark spines, ink for light spines. */
export type SpineText = "gold" | "ink";

export interface Book {
  /** Stable, human-readable id — safe to persist or link against later. */
  id: string;
  title: string;
  /** Shorter wording for the vertical spine when the full title won't fit. */
  spineTitle?: string;
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
  /** Mock catalog data shown when the book is opened. */
  description: string;
  /** Issued as ISBN-13 in the 978-0-3xx registration group (deterministic mock). */
  isbn: string;
  copiesAvailable: number;
  copiesTotal: number;
  location: string;
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

type BookSeed = Omit<Book, "isbn" | "location">;

/**
 * 36 volumes, interleaved by category so an even chunking across the three
 * shelves mixes Fiction, Science, Technology and History on every shelf.
 */
const SEEDS: BookSeed[] = [
  { id: "pride-and-prejudice", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", spineColor: BURGUNDY, textTone: "gold", height: 202, width: 46, bands: true, copiesAvailable: 3, copiesTotal: 4, description: "A sparkling Regency comedy of manners as Elizabeth Bennet and Mr. Darcy trade pride and prejudice." },
  { id: "brief-history-of-time", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", spineColor: TEAL, textTone: "gold", height: 176, width: 42, bands: false, copiesAvailable: 2, copiesTotal: 5, description: "Hawking traces cosmology from the Big Bang to black holes in language any curious reader can follow." },
  { id: "clean-code", title: "Clean Code", author: "Robert C. Martin", category: "Technology", spineColor: CHOCOLATE, textTone: "gold", height: 184, width: 50, bands: false, copiesAvailable: 3, copiesTotal: 3, description: "Martin's handbook of discipline, craft, and refactoring habits for writing software that stays readable." },
  { id: "guns-germs-steel", title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", spineColor: RUST, textTone: "gold", height: 212, width: 60, bands: true, copiesAvailable: 4, copiesTotal: 6, description: "Diamond asks why Eurasian societies came to dominate the world, and answers with geography and germs." },

  { id: "wuthering-heights", title: "Wuthering Heights", author: "Emily Brontë", category: "Fiction", spineColor: SLATE, textTone: "gold", height: 186, width: 40, bands: false, copiesAvailable: 2, copiesTotal: 3, description: "A stormy Yorkshire tale of obsessive love and revenge between Heathcliff and Catherine Earnshaw." },
  { id: "origin-of-species", title: "The Origin of Species", author: "Charles Darwin", category: "Science", spineColor: OLIVE, textTone: "ink", height: 216, width: 56, bands: true, copiesAvailable: 2, copiesTotal: 2, description: "Darwin's careful argument for evolution by natural selection, still the foundation of modern biology." },
  { id: "pragmatic-programmer", title: "The Pragmatic Programmer", author: "Hunt & Thomas", category: "Technology", spineColor: RUST, textTone: "gold", height: 198, width: 58, bands: true, copiesAvailable: 1, copiesTotal: 4, description: "Timeless career advice and practical craftsmanship for programmers, from DRY to stone soup." },
  { id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", category: "History", spineColor: MUSTARD, textTone: "ink", height: 190, width: 44, bands: false, copiesAvailable: 5, copiesTotal: 5, description: "A sweeping history of humankind, from forager bands to the cognitive, agricultural, and scientific revolutions." },

  { id: "moby-dick", title: "Moby-Dick", author: "Herman Melville", category: "Fiction", spineColor: NAVY, textTone: "gold", height: 222, width: 62, bands: true, copiesAvailable: 2, copiesTotal: 4, description: "A whaling ship's monomaniacal hunt for a white whale becomes America's great metaphysical epic." },
  { id: "silent-spring", title: "Silent Spring", author: "Rachel Carson", category: "Science", spineColor: SAGE, textTone: "ink", height: 162, width: 38, bands: false, copiesAvailable: 0, copiesTotal: 2, description: "Carson's lyrical exposé of pesticides that ignited the modern environmental movement." },
  { id: "design-of-everyday-things", title: "The Design of Everyday Things", spineTitle: "Everyday Things", author: "Don Norman", category: "Technology", spineColor: SLATE, textTone: "gold", height: 172, width: 48, bands: false, copiesAvailable: 3, copiesTotal: 5, description: "Norman shows why everyday objects confuse us, and how thoughtful design and affordances fix them." },
  { id: "guns-of-august", title: "The Guns of August", author: "Barbara Tuchman", category: "History", spineColor: BURGUNDY, textTone: "gold", height: 178, width: 48, bands: false, copiesAvailable: 1, copiesTotal: 2, description: "Tuchman recreates the first month of the Great War, the war nobody wanted and everyone stumbled into." },

  { id: "jane-eyre", title: "Jane Eyre", author: "Charlotte Brontë", category: "Fiction", spineColor: FOREST, textTone: "gold", height: 194, width: 44, bands: false, copiesAvailable: 2, copiesTotal: 4, description: "An orphaned governess demands dignity and love on her own terms in this brooding Gothic romance." },
  { id: "cosmos", title: "Cosmos", author: "Carl Sagan", category: "Science", spineColor: PLUM, textTone: "gold", height: 192, width: 54, bands: false, copiesAvailable: 4, copiesTotal: 4, description: "Sagan's tour of the universe, blending astronomy, history, and a plea for scientific wonder." },
  { id: "code-hidden-language", title: "Code: The Hidden Language", author: "Charles Petzold", category: "Technology", spineColor: FOREST, textTone: "gold", height: 208, width: 58, bands: true, copiesAvailable: 1, copiesTotal: 3, description: "Petzold demystifies computers by building from telegraph relays and Boolean logic up to operating systems." },
  { id: "spqr", title: "SPQR", author: "Mary Beard", category: "History", spineColor: PLUM, textTone: "gold", height: 154, width: 36, bands: false, copiesAvailable: 2, copiesTotal: 2, description: "Beard retells a thousand years of Rome through its citizens, slaves, senators, and skeptics." },

  { id: "the-great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", spineColor: MUSTARD, textTone: "ink", height: 168, width: 40, bands: false, copiesAvailable: 3, copiesTotal: 3, description: "Fitzgerald's Jazz Age tragedy of longing and illusion on Long Island's glittering shore." },
  { id: "selfish-gene", title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", spineColor: NAVY, textTone: "gold", height: 158, width: 38, bands: false, copiesAvailable: 2, copiesTotal: 5, description: "Dawkins reframes evolution from the gene's point of view, introducing the now-famous meme." },
  { id: "algorithm-design-manual", title: "The Algorithm Design Manual", author: "Steven Skiena", category: "Technology", spineColor: RUST, textTone: "gold", height: 166, width: 46, bands: false, copiesAvailable: 1, copiesTotal: 2, description: "Skiena's practical guide to designing and analyzing algorithms, war stories included." },
  { id: "1491", title: "1491", author: "Charles C. Mann", category: "History", spineColor: RUST, textTone: "gold", height: 192, width: 50, bands: true, copiesAvailable: 4, copiesTotal: 4, description: "A vivid portrait of the Americas before Columbus — thriving, engineered, and nothing like a wilderness." },

  { id: "1984", title: "1984", author: "George Orwell", category: "Fiction", spineColor: CRIMSON, textTone: "gold", height: 196, width: 44, bands: false, copiesAvailable: 6, copiesTotal: 6, description: "Orwell's chilling vision of totalitarian surveillance, doublethink, and the fragility of truth." },
  { id: "elegant-universe", title: "The Elegant Universe", author: "Brian Greene", category: "Science", spineColor: SLATE, textTone: "gold", height: 198, width: 54, bands: false, copiesAvailable: 2, copiesTotal: 3, description: "Greene explains superstring theory and the search for a final theory of everything." },
  { id: "mythical-man-month", title: "The Mythical Man-Month", author: "Frederick Brooks", category: "Technology", spineColor: CHOCOLATE, textTone: "gold", height: 172, width: 52, bands: true, copiesAvailable: 1, copiesTotal: 1, description: "Brooks's essays on software engineering remain the classic study of why teams run late." },
  { id: "silk-roads", title: "The Silk Roads", author: "Peter Frankopan", category: "History", spineColor: MUSTARD, textTone: "ink", height: 206, width: 56, bands: false, copiesAvailable: 3, copiesTotal: 4, description: "Frankopan recenters world history on the trade routes that carried goods, faiths, and plagues." },

  { id: "to-kill-a-mockingbird", title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", spineColor: SAGE, textTone: "ink", height: 184, width: 46, bands: false, copiesAvailable: 5, copiesTotal: 5, description: "Scout Finch watches her father defend an innocent man in a Depression-era Alabama town." },
  { id: "immortal-life-henrietta-lacks", title: "The Immortal Life of Henrietta Lacks", spineTitle: "Henrietta Lacks", author: "Rebecca Skloot", category: "Science", spineColor: PLUM, textTone: "gold", height: 190, width: 54, bands: false, copiesAvailable: 2, copiesTotal: 2, description: "The story of Henrietta Lacks, whose stolen cells transformed medicine, and her family's fight for recognition." },
  { id: "soul-of-a-new-machine", title: "The Soul of a New Machine", author: "Tracy Kidder", category: "Technology", spineColor: RUST, textTone: "gold", height: 186, width: 56, bands: true, copiesAvailable: 1, copiesTotal: 3, description: "Kidder's Pulitzer-winning chronicle of a startup racing to build a new computer in the early 1980s." },
  { id: "king-leopolds-ghost", title: "King Leopold's Ghost", author: "Adam Hochschild", category: "History", spineColor: CRIMSON, textTone: "gold", height: 200, width: 48, bands: false, copiesAvailable: 0, copiesTotal: 1, description: "Hochschild exposes the brutal extraction of the Congo under Leopold II and the movement that stopped him." },

  { id: "one-hundred-years-of-solitude", title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", category: "Fiction", spineColor: NAVY, textTone: "gold", height: 232, width: 62, bands: true, copiesAvailable: 2, copiesTotal: 3, description: "The multi-generational saga of the Buendía family in mythic Macondo, magic and melancholy entwined." },
  { id: "braiding-sweetgrass", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", category: "Science", spineColor: FOREST, textTone: "gold", height: 176, width: 50, bands: false, copiesAvailable: 4, copiesTotal: 4, description: "Kimmerer weaves Indigenous wisdom and botany into lessons on reciprocity with the living world." },
  { id: "hackers-and-painters", title: "Hackers & Painters", author: "Paul Graham", category: "Technology", spineColor: OLIVE, textTone: "ink", height: 164, width: 48, bands: false, copiesAvailable: 2, copiesTotal: 2, description: "Graham's essays on startups, programming languages, and the hacker mindset that shapes the web." },
  { id: "postwar", title: "Postwar", author: "Tony Judt", category: "History", spineColor: SLATE, textTone: "gold", height: 236, width: 64, bands: true, copiesAvailable: 1, copiesTotal: 2, description: "Judt's magisterial account of Europe's rebirth from the ruins of 1945 to the millennium." },

  { id: "east-of-eden", title: "East of Eden", author: "John Steinbeck", category: "Fiction", spineColor: MUSTARD, textTone: "ink", height: 224, width: 58, bands: true, copiesAvailable: 3, copiesTotal: 3, description: "Steinbeck retells Cain and Abel across California's Salinas Valley in his most personal novel." },
  { id: "the-body", title: "The Body", author: "Bill Bryson", category: "Science", spineColor: TEAL, textTone: "gold", height: 208, width: 52, bands: false, copiesAvailable: 0, copiesTotal: 4, description: "Bryson guides readers room by room through the strange, remarkable machinery of the human body." },
  { id: "ghost-in-the-wires", title: "Ghost in the Wires", author: "Kevin Mitnick", category: "Technology", spineColor: SLATE, textTone: "gold", height: 178, width: 44, bands: false, copiesAvailable: 2, copiesTotal: 2, description: "Mitnick's memoir of social-engineering exploits and the manhunt that finally caught him." },
  { id: "genghis-khan-modern-world", title: "Genghis Khan and the Making of the Modern World", spineTitle: "Genghis Khan", author: "Jack Weatherford", category: "History", spineColor: OLIVE, textTone: "ink", height: 210, width: 60, bands: false, copiesAvailable: 3, copiesTotal: 5, description: "Weatherford recasts Genghis Khan as a unifier and lawgiver whose empire reshaped the world." },
];

const CATEGORY_CODE: Record<Category, string> = {
  Fiction: "F",
  Science: "S",
  Technology: "T",
  History: "H",
};

/** Derive stable mock ISBNs and shelf locations; keep the seeds untouched. */
export const BOOKS: Book[] = SEEDS.map((seed, index) => ({
  ...seed,
  isbn: `978-0-${String(300 + index)}-${String(10000 + index * 37).slice(0, 5)}-${(index * 3) % 10}`,
  location: `${CATEGORY_CODE[seed.category]}-${String((index % 12) + 1).padStart(2, "0")} · Level ${Math.floor(index / 12) + 1}`,
}));
