import React from "react";
import "./App.css";
import BookList from "./components/BookList";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="bookstore container">
      <Header />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
