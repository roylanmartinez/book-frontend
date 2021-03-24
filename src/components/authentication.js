import React, { useState, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

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
  mutation login($username: String = "sdasdff", $password: String = "asdf") {
    loginUser(username: $username, password: $password) {
      success
      errors
      token
    }
  }
`;

const Authentication = (props) => {
  let usernameL, passwordL, usernameR, emailR, password1R, password2R;

  const [state, setstate] = useState({
    errors: false,
    errorsl: false,
    data: props.onCreateUserData,
    datal: props.onLoginUserData,
    register: false,
  });
  // useEffect(() => {
  // loginUser();
  // console.log(errors);
  // }, []);

  useEffect(() => {
    if (props.onCreateUserData) {
      if (props.onCreateUserData.createUser.success) {
        // console.log(data.createUser.token);
        localStorage.setItem("token", props.onCreateUserData.createUser.token);
      } else if (props.onCreateUserData.createUser.errors) {
        const errorNotification = Object.keys(
          props.onCreateUserData.createUser.errors
        ).map(function (key, index) {
          return props.onCreateUserData.createUser.errors[key][0].message;
          // return `${key} ${data.createUser.errors[key]}`;
        });
        // console.log(errorNotification);
        setstate({
          ...state,
          errors: errorNotification,
        });
        // console.log(data.createUser.errors);
        // setstate({ ...state, errors: data.createUser.errors });
      }
    }
    if (props.onLoginUserData) {
      if (props.onLoginUserData.loginUser.success) {
        // console.log("success", data.createUser.token);
        localStorage.setItem("token", props.onLoginUserData.loginUser.token);
      } else {
        // console.log("datal");
        const errorNotificationl = Object.keys(
          props.onLoginUserData.loginUser.errors
        ).map(function (key, index) {
          return props.onLoginUserData.loginUser.errors[key][0].message;
          // return `${key} ${datal.loginUser.errorsl[key]}`;
        });
        // console.log(errorNotificationl[0]);
        setstate({
          ...state,
          errorsl: errorNotificationl,
        });
        // console.log(datal.loginUser.errorsl);
        // setstate({ ...state, errorsl: datal.loginUser.errorsl });
      }
    }
  }, [state.data, props.onCreateUserData, state.datal, props.onLoginUserData]);
  const registerSection = (
    <div className="Login">
      <div>
        <h1 className="text" style={{ textAlign: "center" }}>
          Book app registration
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onCreateUser({
              variables: {
                email: emailR.value,
                username: usernameR.value,
                password1: password1R.value,
                password2: password2R.value,
              },
            });
          }}
        >
          <div>
            <label className="text" htmlFor="asdf">
              Username
            </label>
            <input
              ref={(node) => {
                usernameR = node;
              }}
              // style={{ zIndex: "1000" }}
              placeholder="username"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="text"
              name="asdf"
            />
          </div>
          <div>
            <label className="text" htmlFor="sdfsdfsdf">
              Email
            </label>
            <input
              ref={(node) => {
                emailR = node;
              }}
              // style={{ zIndex: "1000" }}
              placeholder="Email"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="email"
              name="sdfsdfsdf"
            />
          </div>
          <div>
            <label className="text" htmlFor="sdfsdfsdf">
              Password
            </label>
            <input
              ref={(node) => {
                password1R = node;
              }}
              // style={{ zIndex: "1000" }}
              placeholder="Password"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="password"
              name="sdfsdfsdf"
            />
          </div>
          <div>
            <label className="text" htmlFor="sdfsdfsdf">
              Confirm Password
            </label>
            <input
              ref={(node) => {
                password2R = node;
              }}
              // style={{ zIndex: "1000" }}
              placeholder="Password (Again)"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="password"
              name="sdfsdfsdf"
            />
          </div>
          {state.errors ? (
            <React.Fragment>
              <br></br>
              <small
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {state.errors[0]}
              </small>
            </React.Fragment>
          ) : (
            ""
          )}

          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <small
              onClick={() => setstate({ ...state, register: false })}
              style={{ paddingTop: "6px", marginRight: "10px" }}
              className="text clickable"
            >
              Login
            </small>
            <button
              onClick={() => localStorage.setItem("password", password1R.value)}
              // the function is delegated to the form
              type="submit"
              className="btn btn-outline-light"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  const loginSection = (
    <div className="Login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onLoginUser({
            variables: {
              username: usernameL.value,
              password: passwordL.value,
            },
          });
        }}
      >
        <h1 className="text" style={{ textAlign: "center" }}>
          Book app login
        </h1>
        <div>
          <label className="text" htmlFor="asdf">
            Username
          </label>
          <input
            ref={(node) => {
              usernameL = node;
            }}
            placeholder="username"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="text"
            name="asdf"
          />
        </div>

        <div>
          <label className="text" htmlFor="sdfsdfsdf">
            Password
          </label>
          <input
            ref={(node) => {
              passwordL = node;
            }}
            placeholder="Password"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="password"
            name="sdfsdfsdf"
          />
        </div>
        {state.errorsl ? (
          <React.Fragment>
            <br></br>
            <small
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {state.errorsl[0]}
            </small>
          </React.Fragment>
        ) : (
          ""
        )}
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <small
            onClick={() => setstate({ ...state, register: true })}
            style={{ paddingTop: "6px", marginRight: "10px" }}
            className="text clickable"
          >
            register
          </small>
          <button
            onClick={() => localStorage.setItem("password", passwordL.value)}
            type="submit"
            className="btn btn-outline-light"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="auth_cont">
      <div className="auth">
        {state.register ? registerSection : loginSection}
      </div>
    </div>
  );
};

export default Authentication;
