import React, { useContext, Fragment } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

import { PostsContext } from "../Contexts/PostsContext/postsContext";
import { UserContext } from "../Contexts/UserContext/userContext";
import { PostModalContext } from "../Contexts/ModalViewContext/postModalContext";
import { ModalViewContext } from "../Contexts/ModalViewContext/modalViewContext";

import JobCard from "../Components/JobCard";
import JobModal from "../Components/JobModal";
import JobCardLoader from "../Components/Loaders/JobCardLoader.jsx";

import "../Styles/Pages/Home.css";

function Home() {
  const phoneView = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const { setModalView } = useContext(ModalViewContext);
  const { setPostModalIsOpen } = useContext(PostModalContext);
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  const router = useHistory();

  return (
    <div className="home-container">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl text-gray-800">Dash</h2>
        <button
          className="text-white bg-pink-500 border border-pink-600 w-auto rounded-md py-1.5 px-3"
          onClick={() => {
            setPostModalIsOpen(true);
            setModalView(true);
          }}
        >
          Shout
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {phoneView && (
          <div className="mobile-select-holder">
            <SearchIcon height="20px" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search for jobs"
              onClick={() => router.push("/search")}
            />
          </div>
        )}
        {posts.length > 0 ? (
          <small className="text-pink-600">
            {posts.length} {posts.length > 1 ? "Rooms" : "Room"}
          </small>
        ) : (
          <small>Loading...</small>
        )}
        {user.fbID &&
          posts.length > 0 &&
          posts.map((post) => {
            return (
              <JobCard
                key={post.id}
                description={post.description}
                title={post.title}
                id={post.id}
                status={post.status}
                people={post.people}
                date={post.date}
                user={user}
              />
            );
          })}
        {posts.length === 0 && (
          <Fragment>
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
            <JobCardLoader />
          </Fragment>
        )}
      </div>
      <JobModal />
    </div>
  );
}

export default Home;
