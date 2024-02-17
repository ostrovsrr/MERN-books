import { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
export default function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(formData);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/books',
        formData
      );
      navigate('/');
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Add book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-sky-800 rounded-xl w-[600px] p-4 mx-auto"
        >
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title:</label>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            id="title"
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author:</label>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            id="author"
            type="text"
            name="author"
            onChange={handleChange}
            value={formData.author}
          />
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Published Year:
            </label>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            id="publishedYear"
            type="text"
            name="publishedYear"
            onChange={handleChange}
            value={formData.publishedYear}
          />

          <input
            className="bg-sky-300 p-2 m-8"
            type="submit"
            name="submit"
            id="submit"
          />
        </form>
      )}
    </div>
  );
}
