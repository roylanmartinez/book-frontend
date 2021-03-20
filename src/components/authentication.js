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
  }
`;

const Authentication = (props) => {
  let usernameL, passwordL, usernameR, emailR, password1R, password2R;
  const [createUser, { data }] = useMutation(CREATE_USER);
  const [state, setstate] = useState({
    errors: false,
    data: data,
    register: false,
  });
  useEffect(() => {
    if (data) {
      if (data.createUser.success) {
        console.log(data.createUser.token);
        localStorage.setItem("token", data.createUser.token);
      } else if (data.createUser.errors) {
        const errorNotification = Object.keys(data.createUser.errors).map(
          function (key, index) {
            return data.createUser.errors[key][0].message;
            // return `${key} ${data.createUser.errors[key]}`;
          }
        );
        console.log(errorNotification);
        setstate({
          ...state,
          errors: errorNotification,
        });
        // console.log(data.createUser.errors);
        // setstate({ ...state, errors: data.createUser.errors });
      }
    }
  }, [state.data, data]);
  const registerSection = (
    <div className="Login">
      <div>
        <h1 className="text" style={{ textAlign: "center" }}>
          Book app registration
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUser({
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
              onClick={() => {
                console.log(data);
              }}
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
      <form>
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

        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <small
            onClick={() => setstate({ ...state, register: true })}
            style={{ paddingTop: "6px", marginRight: "10px" }}
            className="text clickable"
          >
            register
          </small>
          <button type="submit" className="btn btn-outline-light">
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
