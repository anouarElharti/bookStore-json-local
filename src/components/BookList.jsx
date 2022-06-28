import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncBooks,
  getAllBooks,
  addBook,
} from "../features/slices/bookSlice";
import BookSingle from "./BookSingle";

const BookList = () => {
  const [bookEntered, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const books = useSelector(getAllBooks);
  const dispatch = useDispatch();
  let response = books || JSON.parse(localStorage.getItem("Books"));

  useEffect(() => {
    dispatch(fetchAsyncBooks());
  }, [dispatch]);

  if (!localStorage.getItem("Books")) {
    localStorage.removeItem("Books");
    localStorage.setItem("Books", JSON.stringify(books));
    response = JSON.parse(localStorage.getItem("Books"));
    console.log("All books 1", response);
  } else {
    response = JSON.parse(localStorage.getItem("Books"));
    console.log("All books 2", response);
  }

  const handleBookName = (e) => {
    setBookName(e.target.value);
  };
  const handleBookPrice = (e) => {
    setBookPrice(e.target.value);
  };
  const handleAddBook = (e) => {
    e.preventDefault();
    let book = {
      id: JSON.parse(localStorage.getItem("Books")).data.data.length,
      name: bookEntered,
      price: bookPrice,
    };
    dispatch(addBook(book));
    setBookPrice("");
    setBookName("");
  };

  return (
    <>
      <div className="container flex flex-col gap-2">
        <form onSubmit={handleAddBook}>
          <input type="text" value={bookEntered} onChange={handleBookName} />
          <input type="text" value={bookPrice} onChange={handleBookPrice} />
          <button className="btn btn-primary" type="submit">
            New book
          </button>
        </form>
        {localStorage.getItem("Books") &&
        JSON.parse(localStorage.getItem("Books")).status === 200
          ? JSON.parse(localStorage.getItem("Books")).data.data.map(
              (book, i) => <BookSingle key={i} data={book} />
            )
          : "Error"}
      </div>
    </>
  );
};

export default BookList;
