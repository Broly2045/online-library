// BrowsePage.jsx — displays books filtered by category + search bar
import { useState, useMemo } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks } from '../store/booksSlice'
import { CATEGORIES } from '../data/categories'
import BookCard from '../components/BookCard'
import './BrowsePage.css'

function BrowsePage() {
  // Get :category param from the URL (e.g., /books/fiction)
  const { category } = useParams()
  const allBooks = useSelector(selectAllBooks)

  // Local state for the search query
  const [searchQuery, setSearchQuery] = useState('')

  // Derive the active category label
  const activeCategory = category
    ? CATEGORIES.find((c) => c.name.toLowerCase() === category.toLowerCase())
    : null

  // Filter books: first by category, then by search query (title or author)
  const filteredBooks = useMemo(() => {
    let books = category
      ? allBooks.filter(
          (b) => b.category.toLowerCase() === category.toLowerCase()
        )
      : allBooks

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    }

    return books
  }, [allBooks, category, searchQuery])

  return (
    <main className="browse-page page-container">
      {/* Page header */}
      <div className="browse-header">
        <div>
          <h1 className="browse-title">
            {activeCategory ? activeCategory.name : 'All Books'}
          </h1>
          <p className="browse-subtitle">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search bar to filter books by title or author */}
        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search by title or author…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search books"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="browse-layout">
        {/* ── Sidebar: Category filter tabs ── */}
        <aside className="category-sidebar">
          <p className="sidebar-label">Genres</p>
          <nav className="category-nav">
            {/* "All" option */}
            <NavLink
              to="/books"
              end
              className={({ isActive }) =>
                isActive && !category ? 'cat-tab cat-tab--active' : 'cat-tab'
              }
            >
              All Books
              <span className="cat-tab-count">{allBooks.length}</span>
            </NavLink>

            {/* Individual category links using dynamic routing /books/:category */}
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.name}
                to={`/books/${cat.name.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive ? 'cat-tab cat-tab--active' : 'cat-tab'
                }
              >
                <span>{cat.name}</span>
                <span className="cat-tab-count">
                  {allBooks.filter((b) => b.category === cat.name).length}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* ── Book grid ── */}
        <div className="browse-content">
          {filteredBooks.length > 0 ? (
            <div className="books-grid-browse">
              {filteredBooks.map((book, i) => (
                <BookCard
                  key={book.id}
                  book={book}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="empty-state">
              <span className="empty-icon">◎</span>
              <h3>No books found</h3>
              <p>
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search.`
                  : 'No books in this category yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default BrowsePage
