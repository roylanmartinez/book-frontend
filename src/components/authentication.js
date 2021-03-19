import React, { useState, useEffect, useRef } from "react";
// import Searcher from "./searcher";

const Authentication = () => {
  const [state, setstate] = useState({
    register: false,
  });
  const registerSection = (
    <div className="Login">
      <div>
        <h1 className="text" style={{ textAlign: "center" }}>
          Book app registration
        </h1>
        <div>
          <label className="text" for="asdf">
            Username
          </label>
          <input
            // style={{ zIndex: "1000" }}
            placeholder="username"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="text"
            name="asdf"
          />
        </div>
        <div>
          <label className="text" for="sdfsdfsdf">
            Email
          </label>
          <input
            // style={{ zIndex: "1000" }}
            placeholder="Email"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="email"
            name="sdfsdfsdf"
          />
        </div>
        <div>
          <label className="text" for="sdfsdfsdf">
            Password
          </label>
          <input
            // style={{ zIndex: "1000" }}
            placeholder="Password"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="password"
            name="sdfsdfsdf"
          />
        </div>
        <div>
          <label className="text" for="sdfsdfsdf">
            Confirm Password
          </label>
          <input
            // style={{ zIndex: "1000" }}
            placeholder="Password (Again)"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="password"
            name="sdfsdfsdf"
          />
        </div>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <small
            onClick={() => setstate({ ...state, register: false })}
            style={{ paddingTop: "6px", marginRight: "10px" }}
            className="text clickable"
          >
            Login
          </small>
          <button type="button" className="btn btn-outline-light">
            Register
          </button>
        </div>
      </div>
    </div>
  );
  const loginSection = (
    <div className="Login">
      <div>
        <h1 className="text" style={{ textAlign: "center" }}>
          Book app login
        </h1>
        <div>
          <label className="text" for="asdf">
            Username
          </label>
          <input
            // style={{ zIndex: "1000" }}
            placeholder="username"
            // onClick={openSearcher}
            className="input_style input_searcher"
            type="text"
            name="asdf"
          />
        </div>

        <div>
          <label className="text" for="sdfsdfsdf">
            Password
          </label>
          <input
            // style={{ zIndex: "1000" }}
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
          <button type="button" className="btn btn-outline-light">
            Login
          </button>
        </div>
      </div>
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
