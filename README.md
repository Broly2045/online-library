# Libraria — Online Library System

A modern online library app built with React, Vite, React Router v6, and Redux Toolkit.

## Features

- 📚 Browse books by category with dynamic routing (`/books/:category`)
- 🔍 Search books by title or author
- 📖 Detailed book view with title, author, description, and rating
- ➕ Add new books with full form validation (Redux-powered)
- 🗺️ 404 page with invalid route displayed
- ✨ Smooth animations and polished dark UI

## Tech Stack

- **Vite** — build tool (required)
- **React 18** — UI library
- **React Router v6** — client-side routing
- **Redux Toolkit** — global state management
- **CSS Custom Properties** — design system

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Broly2045/online-library.git
cd online-library

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Top navigation bar
│   ├── BookCard.jsx      # Reusable book card
│   └── StarRating.jsx    # Star rating display
├── data/
│   └── categories.js     # Book categories
├── pages/
│   ├── HomePage.jsx      # Landing page
│   ├── BrowsePage.jsx    # Browse + search (dynamic /books/:category)
│   ├── BookDetailsPage.jsx # Book detail (/books/:category/:id)
│   ├── AddBookPage.jsx   # Add book form with Redux
│   └── NotFoundPage.jsx  # 404 page (no Header)
├── store/
│   ├── store.js          # Redux store configuration
│   └── booksSlice.js     # Books state, actions, selectors
├── styles/
│   └── global.css        # Design tokens and resets
├── App.jsx               # Route definitions
└── main.jsx              # Entry point with Provider + BrowserRouter
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/books` | Browse (all books) |
| `/books/:category` | Browse filtered by category |
| `/books/:category/:id` | Book details |
| `/add-book` | Add a new book |
| `*` | 404 Not Found |


