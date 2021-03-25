import "./App.css";
import "./fa/css/all.css";
import Author from "./components/author";
import Book from "./components/book";
import FeedNews from "./components/feednews";
import Authentication from "./components/authentication";
import SignInAuthor from "./components/signinauthor";

import {
  Switch,
  Route,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verify(token: $token) {
      success
      errors
      payload
    }
  }
`;

const QUERY_BOOKS = gql`
  {
    allBooks {
      id
      name
      description
      made
      category
      love {
        id
        username
        email
      }
      author {
        id
        username
        email
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($category: String!, $name: String!, $description: String!) {
    newBook(category: $category, name: $name, description: $description) {
      book {
        id
      }
    }
  }
`;

const EDIT_LIKE = gql`
  mutation editLike($bookid: ID!, $like: Boolean!) {
    editPostLike(bookid: $bookid, like: $like) {
      book {
        id
      }
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $authorid: ID!
    $username: String!
    $email: String!
    $delete: Boolean!
  ) {
    editTheAuthor(
      authorid: $authorid
      username: $username
      email: $email
      delete: $delete
    ) {
      __typename
    }
  }
`;

const ME_QUERY = gql`
  {
    me {
      id
      verified
      username
      email
      love {
        id
        name
        author {
          id
          username
          email
        }
      }
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    allAuthors {
      id
      username
      email
      love {
        id
        name
        author {
          id
          username
        }
      }
    }
  }
`;

const EDIT_BOOK = gql`
  mutation editBook(
    $bookid: ID!
    $name: String!
    $description: String!
    $category: String!
    $delete: Boolean!
  ) {
    editTheBook(
      bookid: $bookid
      name: $name
      description: $description
      category: $category
      delete: $delete
    ) {
      book {
        __typename
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation createUserF(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    createUser(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
      token
    }
    loginUser(username: $username, password: $password1) {
      success
      errors
      token
      unarchiving
      user {
        id
        username
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginAuthor($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      success
      errors
      token
      unarchiving
      user {
        id
        username
      }
    }
  }
`;
const App = (props) => {
  const [
    verifyToken,
    { data: verifyTokenData, error, loading: loadingVerificationTokenData },
  ] = useMutation(VERIFY_TOKEN);

  const [addBook, { data: addBookData }] = useMutation(ADD_BOOK);

  const [editLike, { data: editLikeData }] = useMutation(EDIT_LIKE);

  const [editAuthor, { data: editAuthorData }] = useMutation(EDIT_AUTHOR);

  const [loginUser, { data: loginUserData }] = useMutation(LOGIN_USER);

  const [createUser, { data: createUserData }] = useMutation(CREATE_USER);

  const [
    editBook,
    { data: editBookData, errors: editBookDataErrors },
  ] = useMutation(EDIT_BOOK, {
    pollInterval: 500,
  });

  const { data: queryBooks, loading: loadingQueryBooks } = useQuery(
    QUERY_BOOKS,
    {
      pollInterval: 500,
    }
  );

  const { data: meQuery, loading: loadingMeQuery } = useQuery(ME_QUERY, {
    pollInterval: 500,
  });

  const { data: allAuthors } = useQuery(ALL_AUTHORS, {
    pollInterval: 500,
  });

  // const { data: allAuthors } = useQuery(ALL_AUTHORS, {
  //   pollInterval: 500,
  // });

  const [state, setState] = useState({
    token: localStorage.getItem("token") || "null",
    authenticated: false,
    data: verifyTokenData,
    update: false,
    edit: false,
    signin: false,
    loading: false,
  });

  const history = useHistory({});

  const location = useLocation({});

  const goHome = () => {
    return history.push("/");
  };
  const goAuthor = (username) => {
    handleEdit(false);
    if (username) {
      return history.push(`/author/${username}/`);
    }
    return history.push(`/author/`);
  };
  const goBook = (id) => {
    if (id) {
      return history.push(`/book/${id}/`);
    }
    return history.push(`/book/author/`);
  };

  const handleEdit = (edit) => {
    if (edit === false) {
      setState({
        ...state,
        edit: false,
      });
    } else if (edit === "bioEdit") {
      setState({
        ...state,
        edit: "bioEdit",
      });
    } else if (edit === "passEdit") {
      setState({
        ...state,
        edit: "passEdit",
      });
    } else if (edit === "delete") {
      setState({
        ...state,
        edit: "delete",
      });
    }
  };

  const difference = (date1, date2) => {
    const dif = date1.getTime() - date2.getTime();
    const seconds = Math.abs(dif / 1000);
    const minutes = seconds / 60;
    const hours = minutes / 60;

    if (0 <= seconds && seconds <= 60) {
      return `${parseInt(seconds) === 0 ? 1 : parseInt(seconds)} second${
        parseInt(seconds) === 1 || parseInt(seconds) === 0 ? "" : "s"
      } ago`;
    } else if (0 <= minutes && minutes <= 60) {
      return `${parseInt(minutes) === 0 ? 1 : parseInt(minutes)} minute${
        parseInt(minutes) === 1 || parseInt(minutes) === 0 ? "" : "s"
      } ago`;
    } else {
      return `${parseInt(hours) === 0 ? 1 : parseInt(hours)} hour${
        parseInt(hours) === 1 || parseInt(hours) === 0 ? "" : "s"
      } ago`;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("token") !== "") {
        // console.log("verify query was sent");
        verifyToken({
          variables: {
            token: localStorage.getItem("token"),
          },
        });
      }
    }
    // if (state.signin){
    //   s
    // }
  }, []);

  // if (loading) {
  //   // call still not answering
  //   console.log(verifyTokenData, "waiting for answer");
  //   return <div className="callNoAnswer"></div>;
  // }
  if (loadingVerificationTokenData || loadingMeQuery || loadingQueryBooks)
    return (
      <div
        onClick={() =>
          console.log(
            loadingVerificationTokenData,
            loadingMeQuery,
            loadingQueryBooks
          )
        }
        className="loading"
      >
        jklhkljkhjkhhgjh
      </div>
    );
  // else if (meQu)

  // state.signin && meQuery.me;

  return (
    <div>
      {state.signin ? (
        <SignInAuthor
          onSetState={setState}
          onLoginUser={loginUser}
          signIn={state.signin}
        />
      ) : meQuery && verifyTokenData ? (
        meQuery.me ? (
          <div className={verifyTokenData.verify.success ? "navbar" : "dnone"}>
            <h2 onClick={goHome} className="navbar_logo-s text">
              TMHBA
            </h2>
            <h2 onClick={goHome} className="navbar_logo-b text">
              TMHBookApp
            </h2>
            {/* <h2 className="navbar_profile">R</h2> */}
            <div className="navbar_right">
              <p
                onClick={() => {
                  window.location.reload();
                  localStorage.setItem("token", "");
                  goHome();
                }}
                className="text"
              >
                Log out
              </p>
              <div
                onClick={() => goAuthor(meQuery.me.username)}
                className="navbar_right_photo"
              >
                <img
                  className="navbar_right_photo-foto"
                  src={require(`./assets/images/profileImage.jpeg`).default}
                  alt={"test1.jpg"}
                ></img>
              </div>
            </div>
          </div>
        ) : (
          // <h1 onClick={() => console.log(meQuery, verifyTokenData)}>
          //   not me query or verify token data
          // </h1>
          <div className="loading"></div>
        )
      ) : (
        // <SigninInAuthor />
        <h1 onClick={() => console.log(state.signin)}></h1>
      )}
      <div className="main">
        <div className="head">
          <Switch>
            <React.Fragment>
              {state.signin ? (
                <Fragment>
                  <div className="loading"></div>
                </Fragment>
              ) : verifyTokenData && meQuery ? (
                // if there is verifyTokenData
                verifyTokenData.verify.success && meQuery.me ? (
                  // if verifyTokenData returned true
                  <React.Fragment>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <FeedNews
                          onDifference={difference}
                          onGoAuthor={goAuthor}
                          onGoBook={goBook}
                          onGoHome={goHome}
                          onQueryBooks={queryBooks}
                          onAddBook={addBook}
                          onEditLike={editLike}
                          onMeQuery={meQuery}
                        />
                      )}
                    />
                    <Route
                      path="/author/"
                      render={() => (
                        <Author
                          onDifference={difference}
                          onHistory={history}
                          onGoAuthor={goAuthor}
                          onGoBook={goBook}
                          onQueryBooks={queryBooks}
                          onMeQuery={meQuery}
                          onEditBook={editBook}
                          editBookData={editBookData}
                          editBookDataErrors={editBookDataErrors}
                          onEditAuthor={handleEdit}
                          editAuthor={state.edit}
                          onAllAuthors={allAuthors}
                          onEditBio={editAuthor}
                          onGoHome={goHome}
                          onHistory={history}
                          onVerifyToken={verifyToken}
                          onLoginUser={loginUser}
                          onSetState={setState}
                          // onlogout={}
                        />
                      )}
                    />
                    <Route
                      path="/book/"
                      render={() => (
                        <Book
                          onDifference={difference}
                          onLocation={location}
                          onHistory={history}
                          onGoAuthor={goAuthor}
                          onGoHome={goHome}
                          onQueryBooks={queryBooks}
                          onMeQuery={meQuery}
                          onEditBook={editBook}
                          editBookData={editBookData}
                          editBookDataErrors={editBookDataErrors}
                        />
                      )}
                    />
                  </React.Fragment>
                ) : (
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Authentication
                        onLoginUser={loginUser}
                        onCreateUser={createUser}
                        onLoginUserData={loginUserData}
                        onCreateUserData={createUserData}
                      />
                    )}
                  />
                )
              ) : localStorage.getItem("token") === null ||
                localStorage.getItem("token") === "" ? (
                // if there is no local token
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Authentication
                      onLoginUser={loginUser}
                      onCreateUser={createUser}
                      onLoginUserData={loginUserData}
                      onCreateUserData={createUserData}
                    />
                  )}
                />
              ) : localStorage.getItem("token") ? (
                // if no answer on verifytokendata but there is local token
                <FeedNews
                  onDifference={difference}
                  onGoAuthor={goAuthor}
                  onGoBook={goBook}
                  onGoHome={goHome}
                  onQueryBooks={queryBooks}
                  onAddBook={addBook}
                  onEditLike={editLike}
                  onMeQuery={meQuery}
                  readToken={true}
                  onVerifyToken={verifyToken}
                />
              ) : (
                <div className="loading"></div>
              )}
            </React.Fragment>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);
