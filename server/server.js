import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

// const __dirname = path.resolve();
//enable to red .env files
dotenv.config();

// start app
const app = express();

//express port
// const port = process.env.PORT || 8080;



//cors

//localhost:5000/posts

//serve static files
// app.use(express.static(path.join(__dirname, 'client', 'build')));

// Sanitize against NoSQL query injections
// app.use(mongoSanitize());

//general middleware setup
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// Setting up a route for our API
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

//mongo port
const CONNECTION_URL = process.env.MONGO_URI;
console.log(CONNECTION_URL)
// app.get('/', (req, res) => {
//   res.send('Hello to Silkroad');
// });

// Redirect back to index.html if urls do not match
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/build' + '/index.html');
// });

// app.get("*", function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   res.end();
// });
const PORT = process.env.PORT || 4000;
//connect to mongodb db
mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));



