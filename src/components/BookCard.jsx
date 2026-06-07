// BookCard.jsx — reusable card component for displaying a book preview
import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import './BookCard.css'

function BookCard({ book, style }) {
  return (
    <article className="book-card animate-fade-up" style={style}>
      {/* Book cover image */}
      <div className="book-card__cover">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          loading="lazy"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none'
          }}
        />
        {/* Category badge */}
        <span className="book-card__category">{book.category}</span>
      </div>

      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>

        <div className="book-card__rating">
          <StarRating rating={book.rating} />
          <span className="rating-value">{book.rating.toFixed(1)}</span>
        </div>

        {/* View Details link routes to the book detail page */}
        <Link
          to={`/books/${book.category.toLowerCase()}/${book.id}`}
          className="book-card__link"
        >
          View Details →
        </Link>
      </div>
    </article>
  )
}

export default BookCard
