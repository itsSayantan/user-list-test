import React from "react";

import UserContent from "../../components/UserContent/UserContent";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "../../components/Modal/Modal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

import "./Home.css";

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);
  const [previousButtonDisabled, setPreviousButtonDisabled] = React.useState(
    true
  );
  const [pageContent, setPageContent] = React.useState([]);
  const [tempPageContentBuffer, setTempPageContentBuffer] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: ""
  });

  const callUserListApi = pageNumber => {
    fetch("https://reqres.in/api/users?per_page=4&page=" + pageNumber)
      .then(res => res.json())
      .then(jsonData => {
        setPage(jsonData.page);
        setPageContent(jsonData.data);
        setTempPageContentBuffer([]);
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

  const handleSearchInputChange = e => {
    // if nothing is there in the search bar set the page content to temp page content
    // empty the temp page content
    const val = e.target.value.toString().trim();

    if (val === "") {
      setPageContent(tempPageContentBuffer);
      setTempPageContentBuffer([]);

      return;
    }

    // if temp page content is empty, set it to actual page content
    // change the page content to be the searched user

    if (
      tempPageContentBuffer instanceof Array &&
      tempPageContentBuffer.length === 0
    )
      setTempPageContentBuffer(pageContent);

    const l = pageContent.length;

    const searchedPageContent = [];
    for (let i = 0; i < l; ++i) {
      const pd = pageContent[i];
      const fn = pd.first_name;

      if (typeof fn === "string") {
        if (fn.startsWith(val)) {
          searchedPageContent.push(pd);
        }
      }
    }

    setPageContent(searchedPageContent);
  };

  const handleUserClick = userID => {
    if (userID) {
      const l = pageContent.length;

      for (let i = 0; i < l; ++i) {
        const pd = pageContent[i];

        if (pd.id === userID) {
          setSelectedUser({
            firstName: pd.first_name,
            lastName: pd.last_name,
            avatar: pd.avatar,
            email: pd.email
          });
          setModalOpen(true);

          break;
        }
      }
    }
  };

  const handleProfileCardClose = e => {
    setModalOpen(false);
    setSelectedUser({ firstName: "", lastName: "", avatar: "", email: "" });
  };

  React.useEffect(() => {
    // call the list users api on component mount
    callUserListApi(page + 1);
  }, []);
  return (
    <div className="home-wrapper">
      {/* User search bar */}
      <SearchBar onChange={handleSearchInputChange} />
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
            <UserContent
              pageContentData={pageContent}
              onUserClick={handleUserClick}
            />
          </tbody>
        </table>
      </div>
      {/* Pagination area */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        nextButtonDisabled={nextButtonDisabled}
        previousButtonDisabled={previousButtonDisabled}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
      />
      {modalOpen ? (
        <Modal>
          <ProfileCard
            firstName={selectedUser.firstName}
            lastName={selectedUser.lastName}
            avatar={selectedUser.avatar}
            email={selectedUser.email}
            onProfileCardClose={handleProfileCardClose}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
