import React from "react";

import UserContent from "../../components/UserContent/UserContent";
import Pagination from "../../components/Pagination/Pagination";

import "./Home.css";

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = React.useState(
    true
  );
  const [pageContent, setPageContent] = React.useState();

  const callUserListApi = pageNumber => {
    fetch("https://reqres.in/api/users?per_page=4&page=" + pageNumber)
      .then(res => res.json())
      .then(jsonData => {
        setPage(jsonData.page);
        setPageContent(jsonData.data);
        setTotalPages(jsonData.total_pages);

        if (jsonData.page === jsonData.total_pages) {
          setNextButtonDisabled(true);
        } else {
          setNextButtonDisabled(false);
        }

        if (jsonData.page === 1) {
          setPreviousButtonDisabled(true);
        } else {
          setPreviousButtonDisabled(false);
        }
      })
      .catch(console.error);
  };

  const handleNextClick = e => {
    if (!nextButtonDisabled && page + 1 <= totalPages) {
      callUserListApi(page + 1);
    }
  };

  const handlePreviousClick = e => {
    if (!previousButtonDisabled && page - 1 > 0) {
      callUserListApi(page - 1);
    }
  };

  React.useEffect(() => {
    // call the list users api on component mount

    callUserListApi(page + 1);
  }, []);
  return (
    <div className="home-wrapper">
      {/* User search bar */}
      {/* User content tabular display area */}
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <UserContent pageContentData={pageContent} />
          </tbody>
        </table>
      </div>
      {/* Pagination area */}
      <Pagination
        currentPage={page}
        nextButtonDisabled={nextButtonDisabled}
        previousButtonDisabled={previousButtonDisabled}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
      />
    </div>
  );
};

export default Home;
