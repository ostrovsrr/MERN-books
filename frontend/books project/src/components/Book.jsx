import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Book() {
  let { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    async function getBook(id) {
      const response = await axios.get(`http://localhost:5000/books/${id}`);
      setBook(response.data);
    }
    getBook(id);
  }, []);
  return (
    book && (
      <div>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.publishedYear}</p>
      </div>
    )
  );
}
