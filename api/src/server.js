import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loggerHandler } from './middleware/logger.js';  // Adjust the path as necessary
import comicRouter from './routes/comic.routes.js'; // Adjust the path as necessary

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

app.use(loggerHandler);
app.use(express.json());

// API routes
app.use('/api/comic', comicRouter);

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, '../../web/dist')));

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../../web/dist/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));