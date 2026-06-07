// HomePage.jsx — Landing page with welcome message, categories, and popular books
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks } from '../store/booksSlice'
import { CATEGORIES } from '../data/categories'
import BookCard from '../components/BookCard'
import './HomePage.css'

function HomePage() {
  // Get all books from Redux store
  const books = useSelector(selectAllBooks)

  // Show top 6 books as "popular" (by rating)
  const popularBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <main className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-glow" aria-hidden="true" />
        <div className="page-container hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>Your Personal Library</span>
          </div>
          <h1 className="hero-title">
            Discover worlds
            <br />
            <em>between pages.</em>
          </h1>
          <p className="hero-subtitle">
            Browse thousands of books, explore categories, and build your
            reading list — all in one beautifully crafted space.
          </p>
          <div className="hero-actions">
            <Link to="/books" className="btn-primary">
              Browse Library
            </Link>
            <Link to="/add-book" className="btn-ghost">
              + Add a Book
            </Link>
          </div>

          {/* Quick stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">{books.length}</span>
              <span className="stat-label">Books</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">{CATEGORIES.length}</span>
              <span className="stat-label">Genres</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">Free</span>
              <span className="stat-label">Always</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="categories-section page-container">
        <div className="section-header">
          <h2 className="section-title">Browse by Genre</h2>
          <p className="section-sub">Find your next read by category</p>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/books/${cat.name.toLowerCase()}`}
              className="category-card"
              style={{ animationDelay: `${i * 0.07}s`, '--cat-color': cat.color }}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">
                {books.filter(b => b.category === cat.name).length} books
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Popular Books Section ── */}
      <section className="popular-section page-container">
        <div className="section-header">
          <h2 className="section-title">Popular Books</h2>
          <Link to="/books" className="see-all-link">See all →</Link>
        </div>
        <div className="books-grid">
          {popularBooks.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
