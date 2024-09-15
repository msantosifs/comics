import axios from "axios";

let comicViewCounts = {};

const getComic = async (req, res) => {
    try {
        const { data } = await axios.get(`https://xkcd.com/info.0.json`);
        const comicId = data.num;
        if (!comicViewCounts[comicId]) {
            comicViewCounts[comicId] = 0;
        }
        comicViewCounts[comicId]++;
        res.json({ comic: data, viewCounts: comicViewCounts[comicId] });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while fetching the data." });
    }
};

const getComicCount = async (req, res) => {
    try {
        const { data } = await axios.get(`https://xkcd.com/info.0.json`);
        const total = data.num;
        res.json({ total });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while fetching the data." });
    }
};

const getComicById = async (req, res) => {
    const comicId = req.params.comicId;

    try {
        const {data} = await axios.get(`https://xkcd.com/${comicId}/info.0.json`);
        if (!comicViewCounts[comicId]) {
            comicViewCounts[comicId] = 0;
        }
        comicViewCounts[comicId]++;
        res.json({ comic: data, viewCounts: comicViewCounts[comicId] });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while fetching the data." });
    }
};

export { getComic, getComicCount, getComicById };
