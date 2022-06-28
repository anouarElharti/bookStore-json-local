import React from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../features/slices/bookSlice";
import { store } from "../features/store";

const NewBook = ({ books }) => {
  const dispatch = useDispatch();
  const handleAddBook = (e) => {
    e.preventDefault();
    console.log("Form values", e.target.book_name.value);
    let newBook = {
      id: books.data.data.length + 1,
      name: e.target.book_name.value,
      price: e.target.price.value,
    };
    dispatch(addBook(newBook));
  };

  return (
    <form onSubmit={handleAddBook}>
      <div>
        <input type="text" name="book_name" />
      </div>
      <div>
        <input type="text" name="price" />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default NewBook;
