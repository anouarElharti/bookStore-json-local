import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { bookDeleted, bookUpdated } from "../features/slices/bookSlice";

const BookSingle = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [currentBook, setCurrentBook] = useState([]);
  const [bookName, setBookName] = useState("");
  const [bookPrice, setPrice] = useState("");
  // EDIT BOOK
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

  // SHOW BOOK DETAILS
  const handleShow = (e) => {
    e.preventDefault();
    let bookID = parseInt(e.target.id_current.value); // GET BOOK ID
    let currentBookD = JSON.parse(
      localStorage.getItem("Books")
    ).data.data.filter((item) => item.id === bookID); // GET CURRENT BOOK BY ID
    console.log("Current book", currentBookD[0]);
    setBookName(currentBookD[0].name); // FILL THE CURRENT BOOK name
    setPrice(currentBookD[0].price); // FILL THE CURRENT BOOK price
    setShow(true);
  };

  // HANDLE EDIT
  const handleEdit = (e) => {
    e.preventDefault();
  };
  // HANDLE DELETE
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(bookDeleted(data.id));
  };

  return (
    <>
      <div classBName="flex-1">
        <p>
          <strong>ID: </strong>
          {data.id}
        </p>
        <p>
          <strong>Name: </strong>
          {data.name}
        </p>
        <p>
          <strong>Price: </strong>
          {data.price}
        </p>
        <p className="flex justify-center gap-2 space-between">
          <form onSubmit={handleEdit}>
            <FontAwesomeIcon icon={faPencilSquare} color="orange" />
          </form>
          <form onSubmit={handleDelete}>
            <button type="submit">
              <FontAwesomeIcon icon={faTrash} color="red" />
            </button>
          </form>
          <form onSubmit={handleShow}>
            <input type="hidden" name="id_current" value={data.id} />
            <button type="submit">
              <FontAwesomeIcon icon={faEye} color="blue" />
            </button>
          </form>
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlEdit}>
            <input
              className="mr-2 rounded w-fit"
              type="text"
              onChange={handleName}
              value={currentBook.name}
            />
            <input
              className="rounded"
              type="text"
              onChange={handlePrice}
              value={currentBook.price}
            />
            <button type="submit" className="btn btn-warning ml-2">
              Confirm change
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookSingle;
