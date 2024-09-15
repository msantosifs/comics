import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loggerHandler } from './middleware/logger.js'; // Use correct relative paths
import comicRouter from './routes/comic.routes.js'; // Use correct relative paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, '../../web/build')));

// AFTER defining routes: Anything that doesn't match, send back index.html
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../../web/build/index.html'));
});

app.use(loggerHandler);
app.use(express.json());
app.use('/api/comic', comicRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));