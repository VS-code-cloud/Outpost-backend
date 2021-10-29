import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

//enable to red .env files
dotenv.config();

// start app
const app = express();

//express port
const PORT = process.env.PORT || 5000;

//mongo port
const CONNECTION_URL = process.env.MONGO_URI;

//cors
app.use(cors());
//localhost:5000/posts

//serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Sanitize against NoSQL query injections
app.use(mongoSanitize());

//general middleware setup
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Setting up a route for our API
app.use('/posts', postRoutes);
app.use('/user', userRouter);

// Redirect back to index.html if urls do not match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//connect to mongodb db
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`mongo_db connected`))
  .catch((error) => console.log(error.message));

//listen to port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
