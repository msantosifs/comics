import express from 'express';
import {loggerHandler} from "./middleware/logger.js";
import comicRouter from './routes/comic.routes.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(loggerHandler);
app.use(express.json());
app.use('/api/comic', comicRouter);


app.listen(port, () => console.log(`Listen to port ${port}`));

