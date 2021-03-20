import React, { useState, useEffect, useRef } from "react";
// import Searcher from "./searcher";
import { useHistory, withRouter } from "react-router-dom";
const Author = (props) => {
  const [state, setstate] = useState({
    edit: false,
  });
  const history = useHistory({});

  const libro = (
    <div className="postCont">
      <div className="post">
        <div
          style={{
            width: "180px",
            height: "180px",
          }}
        >
          <img
            className="clickable"
            src={require(`../assets/images/comedia.jpeg`).default}
            alt={"test1.jpg"}
            style={{ maxHeight: "180px" }}
          ></img>
        </div>
        <div className="text">
          <h4 className="clickable">sdf</h4>
          <br></br>
          <small>
            <b>Description:</b> asdfsdfsdfdsfg sdfgsdf gsdfg sdfgkl sdjfg jsdlkf
            gjsdklfjgsdkl fjskldfj gkldfg
          </small>
          <br></br>
          <small style={{ color: "gray" }}>made 1 seg ago</small>
        </div>
      </div>
    </div>
  );
  const profile = (
    <div className="Author normalDiv">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div style={{ borderRadius: "50%" }} className="Book_phto_cont">
            <img
              // style={{}}
              className="clickable"
              src={require(`../assets/images/profileImage.jpeg`).default}
              alt={"test1.jpg"}
              style={{ height: "100%", width: "100%", borderRadius: "50%" }}
            ></img>
          </div>
          <h1 style={{ textAlign: "center" }} className="text">
            Jessica
          </h1>
          <p className="text">
            <b>email:</b> email@ladfjasdf
          </p>
          <p className="text">
            <b>Books:</b> 3
          </p>
          <div className="text" style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                setstate({ ...state, edit: "bioEdit" });
              }}
              type="button"
              className="btn btn-outline-light"
            >
              Edit your profile <i className="fas fa-user-edit"></i>
            </button>
          </div>

          <h2
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
            className="text"
          >
            Your books
          </h2>
        </div>
      </div>

      <div>{libro}</div>
      <br></br>
    </div>
  );
  const bioEdit = (
    <div>
      <div>
        <h4 className="text">Update profile</h4>
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
        <label className="text" for="asdf">
          Email
        </label>
        <input
          // style={{ zIndex: "1000" }}
          placeholder="email"
          // onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          name="asdf"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: false })}
          className="clickable text"
          style={{
            paddingTop: "8px",
            marginRight: "8px",
            color: "green",
          }}
        >
          cancel
        </small>
        <button type="button" className="btn btn-outline-light">
          Update
        </button>
      </div>
      <br></br>
      <p className="text" style={{ textAlign: "center" }}>
        Looking to edit other things?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: "delEdit" })}
          className="clickable text"
        >
          delete account
        </small>
        <small
          onClick={() => setstate({ ...state, edit: "passEdit" })}
          className="clickable text"
        >
          password
        </small>
      </div>
    </div>
  );
  const passEdit = (
    <div>
      <div>
        <h4 className="text">Update Password</h4>
        <label className="text" for="asdf">
          Old Password
        </label>
        <input
          // style={{ zIndex: "1000" }}
          placeholder="old password"
          // onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          name="asdf"
        />
      </div>
      <div>
        <label className="text" for="asdf">
          New Password
        </label>
        <input
          // style={{ zIndex: "1000" }}
          placeholder="new password"
          // onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          name="asdf"
        />
      </div>
      <div>
        <label className="text" for="asdf">
          New Password (Again)
        </label>
        <input
          // style={{ zIndex: "1000" }}
          placeholder="new password (again)"
          // onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          name="asdf"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: false })}
          className="clickable text"
          style={{
            paddingTop: "8px",
            marginRight: "8px",
            color: "green",
          }}
        >
          cancel
        </small>
        <button type="button" className="btn btn-outline-light">
          Update password
        </button>
      </div>
      <br></br>
      <p className="text" style={{ textAlign: "center" }}>
        Looking to edit other things?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: "delEdit" })}
          className="clickable text"
        >
          delete account
        </small>
        <small
          onClick={() => setstate({ ...state, edit: "bioEdit" })}
          className="clickable text"
        >
          username
        </small>
        <small
          onClick={() => setstate({ ...state, edit: "bioEdit" })}
          className="clickable text"
        >
          email
        </small>
      </div>
    </div>
  );
  const delEdit = (
    <div>
      <h4 className="text">Delete profile</h4>
      <div>
        <label className="text" htmlFor="asdf">
          Confirm your password
        </label>
        <input
          // style={{ zIndex: "1000" }}
          placeholder="new password (again)"
          // onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          name="asdf"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: false })}
          className="clickable text"
          style={{
            paddingTop: "8px",
            marginRight: "8px",
            color: "green",
          }}
        >
          cancel
        </small>
        <button type="button" className="btn btn-outline-danger">
          Delete Account <i className="fas fa-exclamation-triangle"></i>
        </button>
      </div>
      <br></br>
      <p className="text" style={{ textAlign: "center" }}>
        Looking to edit other things?
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <small
          onClick={() => setstate({ ...state, edit: "bioEdit" })}
          className="clickable text"
        >
          username
        </small>
        <small
          onClick={() => setstate({ ...state, edit: "passEdit" })}
          className="clickable text"
        >
          password
        </small>
        <small
          onClick={() => setstate({ ...state, edit: "bioEdit" })}
          className="clickable text"
        >
          email
        </small>
      </div>
    </div>
  );
  const editProfile = (
    <div className="Author normalDiv">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {state.edit == false
          ? profile
          : state.edit === "bioEdit"
          ? bioEdit
          : state.edit === "passEdit"
          ? passEdit
          : delEdit}
      </div>
    </div>
  );
  return editProfile;
};

export default withRouter(Author);
