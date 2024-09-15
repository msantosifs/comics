import * as React from 'react';
import './Pagination.css'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                                    currentPage,
                                                                    totalPages,
                                                                    onPageChange
                                                                }) => {
    const handleFirst = () => onPageChange(1);

    const handlePrevious = () => onPageChange(currentPage - 1);

    const handleRandom = () => {
        if (totalPages > 0) {
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            onPageChange(randomPage);
        }
    }

    const handleNext = () => onPageChange(currentPage + 1);

    const handleLast = () => onPageChange(totalPages);    return (
        <div className="wrapper">
            <button className={currentPage === 1 ? 'disabled-btn' : 'button'} onClick={handleFirst} disabled={currentPage === 1}>
                &lt;&lt;
            </button>

            <button className={`${currentPage === 1 ? 'disabled-btn' : 'button'}`} onClick={handlePrevious} disabled={currentPage === 1}>
                &lt; <span className="nav-button">Prev</span>
            </button>

            <button className='button' onClick={handleRandom} disabled={totalPages === 0}>
                Random
            </button>

            <button className={currentPage === totalPages ? 'disabled-btn' : 'button'} onClick={handleNext} disabled={currentPage === totalPages}>
                <span className="nav-button">Next</span> &gt;
            </button>

            <button className={currentPage === totalPages ? 'disabled-btn' : 'button'} onClick={handleLast} disabled={currentPage === totalPages}>
                &gt;&gt;
            </button>
        </div>
    )
}
