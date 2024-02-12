import { useState } from 'react';
import Main from './components/Main';
import Book from './components/Book';
import '../public/css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Main />}
          id="65c3a7607d544a4ff0038f8f"
        ></Route>
        <Route path={`/book/:id`} element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
