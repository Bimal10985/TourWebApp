import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationPage = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  return (
    <>
      {currentPage === numberOfPages && currentPage === 1 ? (
        ""
      ) : (
        <>
          <Pagination>
            {currentPage > 1 && (
              <Pagination.Prev
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              />
            )}
            <Pagination.Item>{currentPage}</Pagination.Item>
            {currentPage !== numberOfPages && (
              <Pagination.Next
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              />
            )}
          </Pagination>
        </>
      )}
    </>
  );
};

export default PaginationPage;
