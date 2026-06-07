// BookDetailsPage.jsx — displays detailed info about a selected book
// Uses dynamic route: /books/:category/:id
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks } from '../store/booksSlice'
import StarRating from '../components/StarRating'
import './BookDetailsPage.css'

function BookDetailsPage() {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const books = useSelector(selectAllBooks)

  // Find the book by ID
  const book = books.find((b) => b.id === parseInt(id))

  // If book not found, show error state
  if (!book) {
    return (
      <div className="details-not-found page-container">
        <h2>Book not found</h2>
        <p>This book doesn't exist or may have been removed.</p>
        <Link to="/books" className="back-btn">← Back to Browse</Link>
      </div>
    )
  }

  return (
    <main className="details-page page-container">
      {/* Back navigation link — returns to Browse Books page for this category */}
      <button
        className="back-btn"
        onClick={() => navigate(`/books/${category}`)}
      >
        ← Back to Browse
      </button>

      <div className="details-layout">
        {/* ── Left: Book Cover ── */}
        <div className="details-cover-wrap">
          <div className="details-cover">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              onError={(e) => { e.target.style.opacity = 0 }}
            />
          </div>
          {/* Meta info beneath cover */}
          <div className="details-meta">
            <div className="meta-item">
              <span className="meta-label">Pages</span>
              <span className="meta-value">{book.pages ?? '—'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-value">{book.year ?? '—'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">Genre</span>
              <span className="meta-value">{book.category}</span>
            </div>
          </div>
        </div>

        {/* ── Right: Book Info ── */}
        <div className="details-info">
          <span className="details-category">{book.category}</span>

          <h1 className="details-title">{book.title}</h1>
          <p className="details-author">by {book.author}</p>

          {/* Star rating + numeric score */}
          <div className="details-rating">
            <StarRating rating={book.rating} />
            <span className="details-rating-value">{book.rating.toFixed(1)} / 5</span>
          </div>

          <div className="details-divider" />

          {/* Book description */}
          <div className="details-description">
            <h3 className="desc-label">About this book</h3>
            <p className="desc-text">{book.description}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BookDetailsPage
