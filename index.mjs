import express from 'express';
import cors from 'cors'; // Fixed typo here

import routes from './routes/index.mjs';
import db from './config/db.mjs';
import { PORT } from './config/environment.mjs';

const app = express();

const port = PORT || 9001;

db.connection.once('open', () => console.log("Connected to database"))
  .on("error", (err) => console.error("Error connecting to database:", err)); // Handle DB connection errors

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

app.use(cors()); 

app.use(express.json());

app.use('/', routes);
