import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  async function handleDelete() {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:5000/books/${id}`);
      setLoading(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex flex-col border-2 border-sky-800 rounded-xl w-[600px] p-4 mx-auto items-center">
        <h2 className="text-2xl my-4">
          Please confirm your intention to delete this book:
        </h2>
        <button
          className="bg-red-600 text-white w-full p-4 m-8"
          onClick={handleDelete}
        >
          Yes, delete!
        </button>
      </div>
    </div>
  );
}
