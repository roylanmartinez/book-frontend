import React, { useState, useEffect, useRef } from "react";
// import Searcher from "./searcher";

const Book = () => {
  const [state, setstate] = useState({
    me: false,
  });

  return (
    <div className="Book normalDiv">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1 className="text">DON QUIJOTE DE LA MANCHA </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="Book_phto_cont"
            >
              <img
                className="clickable"
                src={require(`../assets/images/comedia.jpeg`).default}
                alt={"test1.jpg"}
                style={{ maxHeight: "300px" }}
              ></img>
            </div>
          </div>
          <br></br>
          <small className="clickable text">
            <b>Author:</b> asdfsd
          </small>
          <br></br>
          <small className="text">
            <b>Description:</b> asdfsdfsdfdsfg sdfgsdf gsdfg sdfgkl sdjfg jsdlkf
            gjsdklfjgsdkl fjskldfj gkldfg
          </small>
          <br></br>
          <small style={{ color: "gray" }}>made 1 seg ago</small>
          <br></br>
          <br></br>
          <div>
            <h5 className="text">You have permissions to edit this book </h5>

            <input
              // style={{ zIndex: "1000" }}
              placeholder="New name?"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="text"
              name="searcher2"
            />
            <input
              // style={{ zIndex: "1000" }}
              placeholder="New description?"
              // onClick={openSearcher}
              className="input_style input_searcher"
              type="text"
              name="searcher2"
            />
            <br></br>
            <br></br>
            <br></br>
            <button type="button" className="btn btn-outline-success">
              <i className="fas fa-book"></i> Edit Book
            </button>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Book;
