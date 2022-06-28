import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { bookUpdated } from "../features/slices/bookSlice";

const EditBook = () => {
  let params = useParams();
  let bookID = parseInt(params.bookID); // GET BOOK ID

  const [currentBook, setCurrentBook] = useState(
    JSON.parse(localStorage.getItem("Books")).data.data.filter(
      (item) => item.id === bookID
    )
  );
  const [bookName, setBookName] = useState(currentBook[0].name);
  const [bookPrice, setPrice] = useState(currentBook[0].price);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlEdit = (e) => {
    e.preventDefault();
    let book = {
      id: currentBook[0].id,
      name: bookName,
      price: bookPrice,
    };
    dispatch(bookUpdated(book));
    console.log("Edited", book);
    setBookName("");
    setPrice("");
    //navigate("/");
  };
  const handleName = (e) => {
    setBookName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };
  return (
    <div className="container justify-center flex flex-col p-12">
      <h1>Edit book</h1>
      <form onSubmit={handlEdit}>
        <input
          className="mr-2 rounded w-fit"
          type="text"
          onChange={handleName}
          value={bookName}
        />
        <input
          className="rounded"
          type="text"
          onChange={handlePrice}
          value={bookPrice}
        />
        <button type="submit" className="btn btn-warning ml-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBook;
