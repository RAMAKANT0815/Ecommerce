import React from 'react';
import { useSelector } from 'react-redux';

function Pagination({
    currentPage,
    onPageChange,
    activeClass = 'active',
    nextPageText = "Next",
    prevPageText = "Prev",
    firstPageText = '1st',
    lastPageText = 'Last'
}) {

    const { totalPages, products } = useSelector((state) => state.product);

    if (products.length === 0 || totalPages <= 1) return null;

    // Generate page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 2;

        for (
            let i = Math.max(1, currentPage - pageWindow);
            i <= Math.min(totalPages, currentPage + pageWindow);
            i++
        ) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">

            {/* First & Previous */}
            {currentPage > 1 && (
                <>
                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange(1)}
                    >
                        {firstPageText}
                    </button>

                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        {prevPageText}
                    </button>
                </>
            )}

            {/* Page Numbers */}
            {getPageNumbers().map((number) => (
                <button
                    key={number}
                    className={`pagination-btn ${currentPage === number ? activeClass : ""}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            {/* Next & Last */}
            {currentPage < totalPages && (
                <>
                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        {nextPageText}
                    </button>

                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange(totalPages)}
                    >
                        {lastPageText}
                    </button>
                </>
            )}

        </div>
    );
}

export default Pagination;