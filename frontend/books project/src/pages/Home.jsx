import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
export default function Main() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data.data.map((book) => book));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() =>
            setShowType((prev) => (prev === 'table' ? 'card' : 'table'))
          }
        >
          Change to {showType === 'table' ? 'Card' : 'Table'}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8"></h1>
        <Link to="/books/add">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}
