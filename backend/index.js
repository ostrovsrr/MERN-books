import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/bookModel.js';
import { bookRouter } from './routes/bookRoute.js';
const app = express();
app.use('/books', bookRouter);
app.use(cors());
app.use(express.json());
config({ path: '.env' });
const PORT = process.env.PORT;
// root
app.get('/', (req, res) => {
  res.status(234).send('Hello Rodion!');
});
// connection to database
try {
  await mongoose.connect(process.env.MongoURL);
  console.log('connection to MongoDB established');
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
} catch (err) {
  throw err;
}
