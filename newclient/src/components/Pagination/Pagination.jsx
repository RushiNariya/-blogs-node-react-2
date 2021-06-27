/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) {
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(totalPosts, pageNumbers);
  return (
    <nav>
      <ul className="pagination justify-content-start">
        {currentPage === pageNumbers[0] ? null : (
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => prevPage()}>
              Previous
            </a>
          </li>
        )}
        {/* <Pagination count={10} variant="outlined" color="secondary" /> */}

        {pageNumbers.map((num) => (
          <li className="page-item" key={num}>
            <a onClick={() => paginate(num)} href="#" className="page-link">
              {num}
            </a>
          </li>
        ))}
        {currentPage === pageNumbers[pageNumbers.length - 1] ? null : (
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => nextPage()}>
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
