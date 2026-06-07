// booksSlice.js — Redux slice for managing the books collection
import { createSlice } from '@reduxjs/toolkit'

// Real book covers via Open Library Covers API (free, no auth required)
// Format: https://covers.openlibrary.org/b/isbn/<ISBN>-L.jpg
const initialBooks = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    description:
      'Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change. The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every one of her regrets as she tries to work out her perfect life.',
    rating: 4.5,
    // ISBN-13 for The Midnight Library (Viking, 2020)
    cover: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg',
    pages: 304,
    year: 2020,
  },
  {
    id: 2,
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for. When House Atreides is betrayed, the destruction of Paul\'s family will set the boy on a journey toward a destiny greater than he could ever have imagined.',
    rating: 4.8,
    // ISBN for Dune (Ace Books edition)
    cover: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
    pages: 688,
    year: 1965,
  },
  {
    id: 3,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    description:
      'In Sapiens, Dr Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical — and sometimes devastating — breakthroughs of the Cognitive, Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology, palaeontology and economics, he explores how the currents of history have shaped our human societies, the animals and plants around us, and even our personalities.',
    rating: 4.7,
    // ISBN for Sapiens (Harper Perennial)
    cover: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    pages: 443,
    year: 2011,
  },
  {
    id: 4,
    title: 'Foundation',
    author: 'Isaac Asimov',
    category: 'Sci-Fi',
    description:
      'The Foundation series is Isaac Asimov\'s iconic masterpiece. Unfolding against the backdrop of a crumbling Galactic Empire, the story of Hari Seldon\'s plan to preserve and expand all human knowledge takes us on a thrilling adventure across the galaxy.',
    rating: 4.6,
    // ISBN for Foundation (Bantam Spectra)
    cover: 'https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg',
    pages: 244,
    year: 1951,
  },
  {
    id: 5,
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Non-Fiction',
    description:
      'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Tara Westover\'s memoir of a survivalist family in Idaho is an extraordinary account of the struggle for self-invention.',
    rating: 4.7,
    // ISBN for Educated (Random House)
    cover: 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg',
    pages: 334,
    year: 2018,
  },
  {
    id: 6,
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    category: 'Fantasy',
    description:
      'Told in Kvothe\'s own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The story begins with a scribe called Chronicler arriving at an inn, where he meets a red-haired man named Kote. Recognizing the man as the legendary Kvothe, Chronicler sets out to record the tale of his life.',
    rating: 4.6,
    // ISBN for The Name of the Wind (DAW Books)
    cover: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
    pages: 662,
    year: 2007,
  },
  {
    id: 7,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    description:
      'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film.',
    rating: 4.8,
    // ISBN for To Kill a Mockingbird (Perennial Modern Classics)
    cover: 'https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg',
    pages: 281,
    year: 1960,
  },
  {
    id: 8,
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    category: 'Fantasy',
    description:
      'Speak again the ancient oaths: Life before death. Strength before weakness. Journey before destination. The Stormlight Archive by Brandon Sanderson is one of the most ambitious fantasy series being written today. The Way of Kings, the first novel in the sequence, begins the tale of Kaladin, Dalinar, and Shallan in a world of magical storms and strange creatures.',
    rating: 4.7,
    // ISBN for The Way of Kings (Tor Books)
    cover: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
    pages: 1007,
    year: 2010,
  },
  {
    id: 9,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Non-Fiction',
    description:
      'In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    rating: 4.5,
    // ISBN for Thinking, Fast and Slow (Farrar, Straus and Giroux)
    cover: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
    pages: 499,
    year: 2011,
  },
  {
    id: 10,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Sci-Fi',
    description:
      'A lone astronaut must save the earth from disaster in this propulsive international bestseller that is perfect for fans of The Martian. Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    rating: 4.9,
    // ISBN for Project Hail Mary (Ballantine Books)
    cover: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg',
    pages: 476,
    year: 2021,
  },
  {
    id: 11,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    description:
      'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.',
    rating: 4.3,
    // ISBN for The Alchemist (HarperOne)
    cover: 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
    pages: 208,
    year: 1988,
  },
  {
    id: 12,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    description:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
    rating: 4.8,
    // ISBN for The Hobbit (Houghton Mifflin Harcourt)
    cover: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    pages: 310,
    year: 1937,
  },
]

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    // The books list — new books are prepended (unshift)
    list: initialBooks,
  },
  reducers: {
    // Action to add a new book at the beginning of the list
    addBook: (state, action) => {
      state.list.unshift(action.payload)
    },
  },
})

export const { addBook } = booksSlice.actions

// Selector: returns all books
export const selectAllBooks = (state) => state.books.list

// Selector: returns books filtered by category (case-insensitive)
export const selectBooksByCategory = (state, category) =>
  category === 'all'
    ? state.books.list
    : state.books.list.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      )

export default booksSlice.reducer
