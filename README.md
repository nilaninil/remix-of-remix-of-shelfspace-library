# Remix of ShelfSpace Library

Build the frontend foundation for a web application called "ShelfSpace", a premium Library Management System with Fines.

Use React, Tailwind CSS, and Framer Motion. Create a warm, elegant classic-library aesthetic using cream (#F5EFE6), dark brown (#3B2A20), wooden brown (#6B4226), gold (#C9A227), and deep green (#1F4D3A). Use Playfair Display for headings and Inter for body text.

MAIN SCREEN:

Create a full-width, realistic wooden bookshelf with three horizontal shelves and wood-grain CSS gradients, visible shelf edges, and shadows.

Display 20 individual book spines across the shelves. Give each book a different color, height, width, vertical gold title, and subtle decorative details.

Use realistic book-cover imagery when available, with attractive CSS-generated covers as fallbacks.

Above the shelves, add a premium navbar with the ShelfSpace logo, search bar, and navigation links for Shelf, Issue/Return, Overdue, and Dashboard.

Add category filters for All, Fiction, Science, Technology, and History.

Use responsive layouts. On mobile, the shelves should scroll horizontally.

INTERACTION:

Each book must be an individual clickable React component.

Hovering should lift the book slightly and bring it forward with a smooth animation.

Clicking a book should select that specific book and prepare it for a physical pull-out-and-open animation. Do not use a generic side panel for book details.

For this first stage, focus on the bookshelf, individual book components, search, category filters, and the selection state. Do not build the other pages yet.

CODE QUALITY:

Use reusable React components, stable book IDs, and local mock book data.

Keep the project clean and easy to extend.

Ensure the page compiles and runs.

Do not generate a static screenshot as the interface. Build real interactive HTML/CSS components.

Make the bookshelf the visual centerpiece, not a generic admin dashboard.

This project was built with [Lovable](https://lovable.dev).


Continue developing this project in the [Lovable editor](https://lovable.dev/projects/75820363-fbd6-4d9a-902b-c1a40abe6a21).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
