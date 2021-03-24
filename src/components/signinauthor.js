import { responsePathAsArray } from "graphql";
import React, { useState, useEffect, useRef } from "react";

// import Searcher from "./searcher";

import { useHistory, withRouter } from "react-router-dom";

const SignInAuthor = (props) => {
  //   let bUsername, bEmail;
  const [state, setstate] = useState({
    // edit: false,
  });
  const history = useHistory({});

  useEffect(() => {
    if (props.signIn) {
      console.log(123);

      props
        .onLoginUser({
          variables: {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          },
        })
        .then((response) => response)
        .then((responseJson) => {
          if (responseJson.data.loginUser.success) {
            history.push(`/author/${localStorage.getItem("username")}`);
            window.location.reload();
          }
        });

      // setTimeout(() => ;
      // history.push(`/author/${localStorage.getItem("username")}`);
    }
  }, []);

  return <h1>need sign in</h1>;
};

export default withRouter(SignInAuthor);
