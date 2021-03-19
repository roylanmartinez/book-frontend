import React, { useState, useEffect, useRef } from "react";
// import Searcher from "./searcher";

const Author = () => {
  const [state, setstate] = useState({});
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
  return (
    <div className="Author normalDiv">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div className="Book_phto_cont">
            <img
              className="clickable"
              src={require(`../assets/images/profileImage.jpeg`).default}
              alt={"test1.jpg"}
              style={{ height: "100%", width: "100%" }}
            ></img>
          </div>
          <h1 className="text">Jessica</h1>
          <p className="text">email@ladfjasdf</p>
          <br></br>
          <h2
            style={{ marginLeft: "10px", textAlign: "center" }}
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
};

export default Author;
