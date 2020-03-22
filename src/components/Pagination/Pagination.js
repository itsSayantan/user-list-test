import React from "react";

import "./Pagination.css";

const Pagination = React.memo(
  ({
    currentPage,
    totalPages,
    nextButtonDisabled,
    previousButtonDisabled,
    onNextClick,
    onPreviousClick
  }) => {
    let nextButtonClass = "next-button";
    let previousButtonClass = "previous-button";

    if (nextButtonDisabled) nextButtonClass += " disabled";

    if (previousButtonDisabled) previousButtonClass += " disabled";

    return (
      <div className="pagination-wrapper">
        <div
          className={previousButtonClass}
          onClick={previousButtonDisabled ? () => {} : onPreviousClick}
        >
          Previous
        </div>
        <div className="page-number">
          Page - {currentPage} of {totalPages}
        </div>
        <div
          className={nextButtonClass}
          onClick={nextButtonDisabled ? () => {} : onNextClick}
        >
          Next
        </div>
      </div>
    );
  }
);

export default Pagination;
