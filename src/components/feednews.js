import React, { useState, useEffect, useRef } from "react";
import datalist from "./data";
import { withRouter, useHistory } from "react-router-dom";

const FeedNews = (props) => {
  const [state, setState] = useState({
    results: [],
    searching: false,
  });
  const input_search = useRef();

  const openSearcher = () => {
    setState({ ...state, searching: true });
    setTimeout(() => input_search.current.focus());
  };

  const closeSearcher = (event) => {
    // if relatedTarget is not nut null and if the click is in front_searcher
    if (event.relatedTarget) {
      if (event.relatedTarget.className === "front_searcher") {
        setState({ ...state, searching: false });
      }
    }
  };

  const handleSearchEngine = (event) => {
    const predata = datalist.filter((item) => {
      return RegExp(event.target.value).test(item.username);
    });
    // console.log(predata);
    // setState((prevState)=>({...prevState, results: predata})
    if (event.target.value.length > 0) {
      setState({ ...state, results: predata.slice(0, 15) });
    } else {
      setState({ ...state, results: [] });
    }

    // console.log(state.results.leng);
  };

  // useEffect(() => {
  //   console.log("sdfasdf");
  // }, []);

  const history = useHistory();

  const goAuthor = () => {
    history.push("/author/");
  };

  const goBook = () => {
    history.push("/book/");
  };

  // results
  const result = state.results.map((item) => (
    <h5 key={item.id} className="searchResults">
      {item.username}
    </h5>
  ));

  const post = (
    <div className="postCont">
      <div className="post">
        <div
          style={{
            width: "180px",
            height: "180px",
          }}
        >
          <img
            onClick={goBook}
            className="clickable"
            src={require(`../assets/images/comedia.jpeg`).default}
            alt={"test1.jpg"}
            style={{ maxHeight: "180px" }}
          ></img>
        </div>
        <div className="text">
          <h4 onClick={goBook} className="clickable">
            sdf
          </h4>
          <small onClick={goAuthor} className="clickable">
            <b>Author:</b> asdfsd
          </small>
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

  setInterval(function () {}, 500);
  return (
    <div className="FeedNews normalDiv">
      <div
        // tabIndex="0"
        // onClick={(event) => console.log(event.currentTarget.className)}
        className={state.searching ? "front_searcher" : "dnone"}
        tabIndex="-1"
      >
        <div
          tabIndex="-1"
          onBlur={closeSearcher}
          className="front_searcher_head"
        >
          <div style={{ marginTop: "50px" }}>
            <i
              onClick={() => setState({ ...state, searching: false })}
              className="fas fa-arrow-left searchSymbol_back"
            ></i>
            <div className="searcher">
              <input
                onChange={handleSearchEngine}
                placeholder="Here you can search for your favorite books as La Celestina.."
                autoFocus
                ref={input_search}
                className="input_style input_searcher"
                type="text"
                id="s"
                name="searcher"
              />
              <i className="fas fa-search searchSymbol"></i>
            </div>
          </div>
          <div className="searhResultCont">{result}</div>
        </div>
      </div>
      <div className="searcher">
        <input
          // style={{ zIndex: "1000" }}
          placeholder="Here you can search for your favorite books as La Celestina.."
          onClick={openSearcher}
          className="input_style input_searcher"
          type="text"
          id="s2"
          name="searcher2"
        />
        <i className="fas fa-search searchSymbol"></i>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "white", marginTop: "10px" }}>
          You can also add a new book here below
        </p>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div className="searcher">
              <input
                placeholder="Book Name"
                className="input_style"
                type="text"
                // id="ss"
                name="searcher"
              />
              <input
                placeholder="Book Category"
                className="input_style"
                type="text"
                // id="sss"
                name="searcher"
              />
              <input
                placeholder="Book Description"
                className="input_style"
                type="text"
                // id="sss"
                name="searcher"
              />
              <button type="button" className="btn btn-outline-light btn-sm">
                <small>new book</small>
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "white", marginTop: "10px", fontWeight: "1000" }}>
            Published books in the book database
          </p>
        </div>
        {post}
      </div>
    </div>
  );
};

export default withRouter(FeedNews);
