// store.js — configures the Redux store with the books slice
import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './booksSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})
