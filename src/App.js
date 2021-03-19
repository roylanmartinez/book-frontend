import "./App.css";
import "./fa/css/all.css";

// import AuthorList from "./components/authorlist";
import Author from "./components/author";
import Book from "./components/book";
import FeedNews from "./components/feednews";
import Authentication from "./components/authentication";
// import Login from "./components/login";
// import Register from "./components/register";

import { Switch, Route, useHistory, withRouter } from "react-router-dom";
import React from "react";

const App = (props) => {
  const history = useHistory({});

  const goHome = () => {
    history.push("/");
  };
  const goAuthor = () => {
    history.push("/author/");
  };

  return (
    <React.Fragment>
      <div style={{ display: "none" }} className="navbar">
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
            {/* <Route
              exact
              path="/"
              render={() =>
                // if user is logged in return <Feednews />
                //else return authentication
                true ? <Register /> : <Login />
              }
            /> */}
            <Route exact path="/" render={() => <FeedNews />} />
            <Route exact path="/a" render={() => <Authentication />} />
            <Route path="/author/" render={() => <Author />} />
            <Route path="/book/" render={() => <Book />} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(App);
