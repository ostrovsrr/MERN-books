import { Book } from '../models/bookModel.js';
import express from 'express';

export const bookRouter = express.Router();
// add a book
bookRouter.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({ message: 'Please provide all fields!' });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// get all books
bookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find({}).exec();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// get book by id
bookRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id }).exec();
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message }); // it could be client error if no such id exists!
  }
});
// update entire book by id (put)
bookRouter.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res
        .status(400)
        .send({ message: 'Please provide all the field to update!' });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body).exec();
    return res.status(200).send('book updated successfully');
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// delete book by id
bookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteOne({ _id: id });
    return res.status(200).send('book deleted successfully');
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// update some properties of book by id (patch)
bookRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title && !req.body.author && !req.body.publishedYear) {
      return res
        .status(400)
        .send({ message: 'Please at least one field to update!' });
    }
    // receive updated properties from user
    const { title, author, publishedYear } = req.body;
    // send request to Mongo to update existing book by id
    await Book.findByIdAndUpdate(id, {
      title: title,
      author: author,
      publishedYear: publishedYear,
    }).exec();
    const newBook = await Book.findOne({ _id: id }).exec();
    return res.status(200).json(newBook);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
