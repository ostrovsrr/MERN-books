import { useState } from 'react';
import Home from './pages/Home';
import ViewBook from './pages/ViewBook';
import AddBook from './pages/AddBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import '../css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/books/details/:id`} element={<ViewBook />} />
        <Route path={`/books/add`} element={<AddBook />} />
        <Route path={`/books/edit/:id`} element={<EditBook />} />
        <Route path={`/books/delete/:id`} element={<DeleteBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
