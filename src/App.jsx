// App.jsx — defines all routes for the application
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import BookDetailsPage from './pages/BookDetailsPage'
import AddBookPage from './pages/AddBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const location = useLocation()
  // 404 page should NOT render the Navbar/Header
  const is404 = ![
    '/',
    '/books',
    '/add-book',
  ].includes(location.pathname) &&
    !location.pathname.startsWith('/books/')

  return (
    <>
      {/* Only render Navbar on valid routes */}
      {!is404 && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Dynamic category routing: /books/:category */}
        <Route path="/books" element={<BrowsePage />} />
        <Route path="/books/:category" element={<BrowsePage />} />
        {/* Dynamic book detail routing: /books/:category/:id */}
        <Route path="/books/:category/:id" element={<BookDetailsPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        {/* Catch-all 404 route — no Header rendered */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
