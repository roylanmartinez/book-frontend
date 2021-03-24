import React, { useState, useEffect, useRef } from "react";
import datalist from "./data";
import { withRouter } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const FeedNews = (props) => {
  let bName, bCategory, bDescription;

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
    // const predata = datalist.filter((item) => {
    //   return RegExp(event.target.value).test(item.username);
    // });
    const predata = props.onQueryBooks.allBooks.filter((item) => {
      return RegExp(event.target.value).test(item.name);
    });
    // setState((prevState)=>({...prevState, results: predata})
    if (event.target.value.length > 0) {
      setState({ ...state, results: predata.slice(0, 15) });
    } else {
      setState({ ...state, results: [] });
    }

    // console.log(state.results.leng);
  };

  // const { loading, error, data: books } = useQuery(QUERY_BOOKS, {
  //   pollInterval: 500,
  // });

  useEffect(() => {
    if (props.readToken) {
      props.onVerifyToken({
        variables: {
          token: localStorage.getItem("token"),
        },
      });
    }
  }, []);

  // const results =

  // setInterval(function () {
  //   setState({
  //     ...state,
  //   })
  // }, 500)

  // results
  const result = state.results.map((item) => (
    <h5 key={item.id} className="searchResults">
      <b
        style={{ fontWeight: "1000", fontSize: "25px" }}
        className="clickable text"
        onClick={() => props.onGoBook(item.id)}
      >
        {item.name}
      </b>
      <small style={{ color: "gray" }}> written by </small>{" "}
      <b
        className="clickable text"
        onClick={() => props.onGoAuthor(item.author.username)}
      >
        {item.author.username}
      </b>
    </h5>
  ));

  // if (props.onQueryBooks) {
  //   setInterval(function () {
  //     console.log(props.onQueryBooks.allBooks.map((item) => item.name));
  //   }, 500);
  // }
  return (
    <div className="FeedNews normalDiv fadeIn">
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
          defaultValue={input_search.current ? input_search.current.value : ""}
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
        <p
          // onClick={() => console.log(books)}
          style={{ color: "white", marginTop: "10px" }}
        >
          You can also add a new book here below
        </p>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div className="searcher">
              <input
                ref={(node) => {
                  bName = node;
                }}
                placeholder="Book Name"
                className="input_style"
                type="text"
                // id="ss"
                name="searcher"
              />
              <input
                ref={(node) => {
                  bCategory = node;
                }}
                placeholder="Book Category"
                className="input_style"
                type="text"
                // id="sss"
                name="searcher"
              />
              <input
                ref={(node) => {
                  bDescription = node;
                }}
                placeholder="Book Description"
                className="input_style"
                type="text"
                // id="sss"
                name="searcher"
              />
              <button
                onClick={() => {
                  props.onAddBook({
                    variables: {
                      name: bName.value,
                      category: bCategory.value,
                      description: bDescription.value,
                    },
                  });
                  bName.value = "";
                  bCategory.value = "";
                  bDescription.value = "";
                }}
                type="input"
                className="btn btn-outline-light btn-sm"
              >
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
          <p
            // className="fadeIn"
            style={{ color: "white", marginTop: "50px", fontWeight: "1000" }}
          >
            Recently shared books
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {props.onQueryBooks
            ? props.onQueryBooks.allBooks.map((item) => (
                <Post
                  key={item.id}
                  onGoAuthor={props.onGoAuthor}
                  onGoBook={props.onGoBook}
                  item={item}
                  onEditLike={props.onEditLike}
                  onMeQuery={props.onMeQuery}
                  onDifference={props.onDifference}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

const Post = (props) => {
  const [state, setState] = useState({
    like: undefined,
  });

  if (props.onMeQuery && props.item) {
    if (props.onMeQuery.me) {
      if (state.like === undefined) {
        setState({
          ...state,
          like: props.item.love
            .map((item) => item.username)
            .includes(props.onMeQuery.me.username),
        });
      }
    }
  }
  return (
    <div className="postCont">
      <div className="post">
        <div
          style={{
            width: "230px",
            maxHeight: "230px",
            // paddingBottom: "100px",
          }}
        >
          <img
            onClick={() => {
              props.onGoBook(props.item.id);
            }}
            className="clickable"
            src={require(`../assets/images/comedia.jpeg`).default}
            alt={"test1.jpg"}
            style={{
              maxHeight: "100%",
              marginRight: "5px",
              borderRadius: "5px 0px 0px 5px",
              // marginBottom: "50px",
            }}
          ></img>
        </div>
        <div style={{ width: "300px" }} className="">
          <h4
            onClick={() => props.onGoBook(props.item.id)}
            style={{ wordBreak: "break-all", marginTop: "10px" }}
            className="clickable"
          >
            {props.item.name}
          </h4>
          <small>
            Book written by{" "}
            <b
              className="clickable"
              onClick={() => props.onGoAuthor(props.item.author.username)}
            >
              {props.item.author.username}
            </b>
          </small>
          <br></br>
          <small
            // onClick={() =>
            //   console.log(
            //     props.item.love
            //       .map((item) => item.username)
            //       .includes(props.meQuery.me.username)
            //   )
            // }
            style={{ wordBreak: "break-all" }}
          >
            <b>Description:</b> {props.item.description}
          </small>
          <br></br>
          <small
            // onClick={() =>
            //   console.log(
            //     props.item.love
            //       .map((item) => item.username)
            //       .includes(props.meQuery.me.username)
            //   )
            // }
            style={{ wordBreak: "break-all" }}
          >
            <b>Category:</b> {props.item.category}
          </small>
          <br></br>
          <small
            // onClick={() => console.log(props.item.love)}
            style={{ color: "gray" }}
          >
            Published{" "}
            {props.onDifference(new Date(), new Date(props.item.made))}
          </small>
          <br></br>
          <small style={{ marginRight: "5px", wordBreak: "break-all" }}>
            {props.item.love.length === 0 ? (
              ""
            ) : (
              <span>
                <span>❤</span> loved by{" "}
              </span>
            )}
            {props.item.love.map((value) => {
              return (
                <b
                  onClick={() => props.onGoAuthor(value.username)}
                  key={value.id}
                  className=" clickable"
                >
                  ●{` ${value.username} `}
                </b>
              );
            })}
          </small>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {state.like !== undefined ? (
              state.like ? (
                <button
                  style={{
                    color: "inherit",
                    backgroundColor: "inherit",
                    borderColor: "inherit",
                  }}
                  onClick={() => {
                    setState({
                      state,
                      like: !state.like,
                    });
                    props.onEditLike({
                      variables: {
                        bookid: props.item.id,
                        like: false,
                      },
                    });
                  }}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="far fa-heart"></i> liked
                </button>
              ) : (
                <button
                  style={{
                    color: "inherit",
                    backgroundColor: "inherit",
                    borderColor: "inherit",
                  }}
                  onClick={() => {
                    setState({
                      state,
                      like: !state.like,
                    });
                    props.onEditLike({
                      variables: {
                        bookid: props.item.id,
                        like: true,
                      },
                    });
                  }}
                  type="button"
                  className="btn btn-outline-light"
                >
                  like
                </button>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FeedNews);
