import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCallBooks } from "../api";

//FETCHING DATA USING ASYNC THUNK
export const fetchAsyncBooks = createAsyncThunk(
  "books/fetchAsyncBooks",
  async () => {
    const response = await apiCallBooks.get("./books.json").catch((err) => {
      console.log("Error fetching data", err);
    });
    // Return the response
    return response;
  }
);

const initialState = {
  books: {},
  bookDetail: {},
};

// CREATING THE SLICE FOR BOOKS
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    allBooks: (state, { payload }) => {
      state.books = payload;
    },
    bookUpdated(state, action) {
      const { id, name, price } = action.payload;
      let allBooks = JSON.parse(localStorage.getItem("Books"));
      let new_list = [];

      let existingBook = allBooks.data.data.filter((book) => book.id === id);
      if (existingBook) {
        existingBook[0].name = name;
        existingBook[0].price = price;
      }
      new_list = allBooks.data.data.filter((book) => book.id !== id);
      new_list.push(existingBook);
      // allBooks.data.data.map(
      //   (obj) => existingBook.find((o) => o.id === obj.id) || obj
      // );
      allBooks.data.data = new_list;
      localStorage.setItem("Books", allBooks);
      console.log("Edited list ", localStorage.getItem("Books"));
    },
    bookDeleted(state, action) {
      const id = action.payload;
      //console.log("Book to be deleted", action.payload);
      let newList = JSON.parse(localStorage.getItem("Books")).data.data.filter(
        (book, i) => book.id !== id
      );
      JSON.parse(localStorage.getItem("Books")).data.data = newList;
      return JSON.parse(localStorage.getItem("Books"));
    },
    addBook(state, action) {
      return JSON.parse(localStorage.getItem("Books")).data.data.push(
        action.payload
      );
    },
  },
  extraReducers: {
    [fetchAsyncBooks.pending]: () => {
      console.log("Pending Books...");
    },
    [fetchAsyncBooks.fulfilled]: (state, { payload }) => {
      console.log("Fetch Books successfully!");
      return { ...state, books: payload };
    },
    [fetchAsyncBooks.rejected]: () => {
      console.log("Fetch Books rejected!");
    },
  },
});

export const { allBooks, bookUpdated, addBook, bookDeleted } =
  bookSlice.actions;
export const getAllBooks = (state) => state.books.books;
export default bookSlice.reducer;
