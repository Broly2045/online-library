// AddBookPage.jsx — form to add a new book using Redux
// After submission, redirects to Browse Books with new book at the top
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/booksSlice'
import { CATEGORIES } from '../data/categories'
import './AddBookPage.css'

// Fallback cover pool for newly added books (real covers via Open Library ISBN API)
const COVER_POOL = [
  'https://covers.openlibrary.org/b/isbn/9780385737951-L.jpg', // The Hunger Games
  'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', // The Great Gatsby
  'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', // Pride and Prejudice
  'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg', // The Catcher in the Rye
]

// Initial empty form state
const INITIAL_FORM = {
  title: '',
  author: '',
  category: '',
  description: '',
  rating: '',
  pages: '',
  year: '',
}

function AddBookPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Form field state
  const [form, setForm] = useState(INITIAL_FORM)

  // Validation errors per field
  const [errors, setErrors] = useState({})

  // Whether form has been submitted (show success state)
  const [submitted, setSubmitted] = useState(false)

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate all fields before submission
  const validate = () => {
    const newErrors = {}

    if (!form.title.trim())
      newErrors.title = 'Title is required.'
    if (!form.author.trim())
      newErrors.author = 'Author is required.'
    if (!form.category)
      newErrors.category = 'Please select a category.'
    if (!form.description.trim())
      newErrors.description = 'Description is required.'
    else if (form.description.trim().length < 30)
      newErrors.description = 'Description should be at least 30 characters.'

    const ratingNum = parseFloat(form.rating)
    if (!form.rating)
      newErrors.rating = 'Rating is required.'
    else if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5)
      newErrors.rating = 'Rating must be between 1 and 5.'

    if (form.pages && (isNaN(parseInt(form.pages)) || parseInt(form.pages) < 1))
      newErrors.pages = 'Pages must be a positive number.'

    const yr = parseInt(form.year)
    if (form.year && (isNaN(yr) || yr < 1000 || yr > new Date().getFullYear()))
      newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`

    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      // Show validation errors
      setErrors(validationErrors)
      return
    }

    // Build the new book object
    const newBook = {
      id: Date.now(), // unique ID using timestamp
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      description: form.description.trim(),
      rating: parseFloat(parseFloat(form.rating).toFixed(1)),
      pages: form.pages ? parseInt(form.pages) : null,
      year: form.year ? parseInt(form.year) : null,
      // Assign a random cover image from the pool
      cover: COVER_POOL[Math.floor(Math.random() * COVER_POOL.length)],
    }

    // Dispatch to Redux — new book is prepended to the list
    dispatch(addBook(newBook))
    setSubmitted(true)

    // Redirect to Browse Books after a short delay for UX
    setTimeout(() => {
      navigate('/books')
    }, 1200)
  }

  return (
    <main className="add-page page-container">
      <div className="add-layout">
        {/* Left panel: info */}
        <div className="add-sidebar">
          <div className="add-sidebar__inner">
            <span className="add-eyebrow">Contribute</span>
            <h1 className="add-title">Add a new book</h1>
            <p className="add-desc">
              Share a book you love with the community. Fill in the details and
              it will appear at the top of the Browse page instantly.
            </p>
            <div className="add-hint">
              <span className="hint-icon">✦</span>
              <p>Fields marked with * are required</p>
            </div>
          </div>
        </div>

        {/* Right panel: form */}
        <div className="add-form-wrap">
          {submitted ? (
            // Success state
            <div className="success-state">
              <span className="success-icon">✓</span>
              <h2>Book added!</h2>
              <p>Redirecting to Browse Books…</p>
            </div>
          ) : (
            <form className="add-form" onSubmit={handleSubmit} noValidate>
              {/* ── Title ── */}
              <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
                <label htmlFor="title" className="form-label">Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. The Great Gatsby"
                  className="form-input"
                  autoComplete="off"
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>

              {/* ── Author ── */}
              <div className={`form-group ${errors.author ? 'has-error' : ''}`}>
                <label htmlFor="author" className="form-label">Author *</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="e.g. F. Scott Fitzgerald"
                  className="form-input"
                  autoComplete="off"
                />
                {errors.author && <p className="form-error">{errors.author}</p>}
              </div>

              {/* ── Category ── */}
              <div className={`form-group ${errors.category ? 'has-error' : ''}`}>
                <label htmlFor="category" className="form-label">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="">Select a category…</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="form-error">{errors.category}</p>}
              </div>

              {/* ── Description ── */}
              <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="A brief synopsis or description of the book…"
                  className="form-input form-textarea"
                  rows={4}
                />
                {errors.description && <p className="form-error">{errors.description}</p>}
              </div>

              {/* ── Rating, Pages, Year (3-column row) ── */}
              <div className="form-row">
                <div className={`form-group ${errors.rating ? 'has-error' : ''}`}>
                  <label htmlFor="rating" className="form-label">Rating * (1–5)</label>
                  <input
                    id="rating"
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                    min="1"
                    max="5"
                    step="0.1"
                    className="form-input"
                  />
                  {errors.rating && <p className="form-error">{errors.rating}</p>}
                </div>

                <div className={`form-group ${errors.pages ? 'has-error' : ''}`}>
                  <label htmlFor="pages" className="form-label">Pages</label>
                  <input
                    id="pages"
                    type="number"
                    name="pages"
                    value={form.pages}
                    onChange={handleChange}
                    placeholder="e.g. 320"
                    min="1"
                    className="form-input"
                  />
                  {errors.pages && <p className="form-error">{errors.pages}</p>}
                </div>

                <div className={`form-group ${errors.year ? 'has-error' : ''}`}>
                  <label htmlFor="year" className="form-label">Year</label>
                  <input
                    id="year"
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="e.g. 2023"
                    min="1000"
                    max={new Date().getFullYear()}
                    className="form-input"
                  />
                  {errors.year && <p className="form-error">{errors.year}</p>}
                </div>
              </div>

              {/* Submit button */}
              <button type="submit" className="submit-btn">
                Add to Library →
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

export default AddBookPage
