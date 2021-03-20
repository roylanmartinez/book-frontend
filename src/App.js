import "./App.css";
import "./fa/css/all.css";
import Author from "./components/author";
import Book from "./components/book";
import FeedNews from "./components/feednews";
import Authentication from "./components/authentication";

import {
  Switch,
  Route,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
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

const App = (props) => {
  const [verifyToken, { data }] = useMutation(VERIFY_TOKEN, {
    pollInterval: 500,
  });

  const [state, setState] = useState({
    token: localStorage.getItem("token") || "null",
    authenticated: false,
    data: data,
    update: false,
  });

  const history = useHistory({});

  const goHome = () => {
    history.push("/");
  };
  const goAuthor = () => {
    history.push("/author/");
  };
  const handleUpdate = () => {
    setState({
      ...state,
      update: !state.update,
    });
  };
  // useEffect(() => {
  //   console.log(123);
  // });

  useEffect(() => {
    // on load call server compare local and remote token
    verifyToken({
      variables: { token: localStorage.getItem("token") || "null" },
    });
  }, [state.token]);

  if (!data) {
    // call still not answering
    return (
      <div className="callNoAnswer">
        {/* <h1 onClick={() => console.log(data.verify)}>asdfasdfasdf</h1> */}
      </div>
    );
  }
  if (data) {
    // Call work and already answered
    setInterval(function () {
      if (state.token !== localStorage.getItem("token")) {
        setState({
          ...state,
          token: localStorage.getItem("token"),
        });
      } else if (state.token === localStorage.getItem("token")) {
        // verifyToken({ variables: { token: localStorage.getItem("token") } });
      }
      // setState({
      //   ...state,
      //   token: localStorage.getItem("token"),
      // });
    }, 500);

    return (
      <React.Fragment>
        <div className={data.verify.success ? "navbar" : "dnone"}>
          <h2 onClick={goHome} className="navbar_logo-s text">
            TMHBA
          </h2>
          <h2 onClick={goHome} className="navbar_logo-b text">
            TMHBookApp
          </h2>
          {/* <h2 className="navbar_profile">R</h2> */}
          <div className="navbar_right">
            <p className="text">Log out</p>
            <div onClick={goAuthor} className="navbar_right_photo">
              <img
                className="navbar_right_photo-foto"
                src={require(`./assets/images/profileImage.jpeg`).default}
                alt={"test1.jpg"}
              ></img>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="head">
            <Switch>
              {data.verify.success ? (
                <Route exact path="/" render={() => <FeedNews />} />
              ) : (
                <Route
                  exact
                  path="/"
                  render={() => <Authentication onUpdate={handleUpdate} />}
                />
              )}
              <Route exact path="/author/" render={() => <Author />} />
              <Route path="/book/" render={() => <Book />} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default withRouter(App);
