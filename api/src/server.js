import express from 'express';
import {loggerHandler} from "./middleware/logger.js";
import comicRouter from './routes/comic.routes.js';
import path from 'path';

const port = process.env.PORT || 3000;


const app = express();
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../web/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../web/build/index.html'))
})

app.use(loggerHandler);
app.use(express.json());
app.use('/api/comic', comicRouter);


app.listen(port, () => console.log(`Listen to port ${port}`));

