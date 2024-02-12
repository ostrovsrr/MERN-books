import { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

export default function Main() {
  const [books, setBooks] = useState([]);
  const bookEls = books.map((book) => (
    <>
      <div className="book-container">
        <div className="book-title">{book.title}</div>
        <div className="book-author">by {book.author}</div>
        <div className="book-published">
          Published Year: {book.publishedYear}
        </div>
      </div>
    </>
  ));
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data.data.map((book) => book));
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <>
      {bookEls}
      {/* <Book id="65c3006b9af875367c31f42f" /> */}
    </>
  );
}
