import {useEffect, useState} from "react";
import {Comic, ComicWrapper} from "../models/comic.models.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import {Pagination} from "../components/pagination/Pagination.tsx";
import './ComicPage.css'
import {useNavigate, useParams} from "react-router-dom";
import {Transcript} from "../components/transcript/Transcript.tsx";

export const ComicPage = () => {
    const [comic, setComic] = useState<Comic | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(0);
    const [error, setError] = useState<null | string>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const apiURL = '/api/comic';

    const [totalPages, setTotalPages] = useState(0);
    const { comicNumber } = useParams();
    const [comicId, setComicId] = useState(comicNumber);
    const [views, setViews] = useState(0);

    useEffect(() => {
        fetchComic(comicId ? comicId : undefined);
        fetchTotalPages();
    }, [comicId]);


    const fetchTotalPages = async () => {
        const url = `${apiURL}/total`;
        try {
            setIsLoading(prevLoading => prevLoading + 1);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { total } = await response.json();
            setTotalPages(total);
        } catch (err) {
            setError(`Could not fetch comic details.`);
        } finally {
            setIsLoading(prevLoading => prevLoading - 1);
        }
    };

    const fetchComic = async (comicId?: string | undefined) => {
        try {
            setIsLoading(prevLoading => prevLoading + 1);
            const url = comicId ? `${apiURL}/${comicId}` : apiURL;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const wrapper = await response.json() as ComicWrapper;
            setComic(wrapper.comic);
            setViews(wrapper.viewCounts);
            setCurrentPage(wrapper.comic?.num);
            setError(null);
            if (wrapper.comic.img.length > 0) {
                setIsImageLoading(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(prevLoading => prevLoading - 1);
        }
    }

    const handlePageChange = (comicId: number) => {
        setCurrentPage(comicId);
        setComicId(comicId.toString())
    }

    if (isLoading > 0) {
        return <Spinner></Spinner>;
    }

    if (error) {
        return (
            <div>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="page">
            {comic && (
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}/>
                    {comic.transcript?.length > 0 && (
                        <div className="transcript">
                            <Transcript transcript={comic.transcript}/>
                        </div>)}
                    <h1 className="title">{comic.title}</h1>

                    <div className="image-container">
                        {isImageLoading && <Spinner/>}
                        <img
                            className="image"
                            src={comic.img}
                            alt={comic.alt}
                            onLoad={() => setIsImageLoading(false)}
                            style={{display: isImageLoading ? 'none' : 'block'}}
                        />
                    </div>
                    <h2 className="date">Created in {`${comic.day}/${comic.month}/${comic.year}`}</h2>
                </div>
            )}
            <p className="view-count">This comic has been viewed {views} times.</p>
        </div>
    )
}
