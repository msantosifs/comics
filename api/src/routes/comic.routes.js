import express from 'express';
import { getComic, getComicCount, getComicById } from "../controllers/comic.controller.js";

const router = express.Router();

router.get('/', getComic);
router.get('/total', getComicCount);
router.get('/:comicId', getComicById);

export default router;
