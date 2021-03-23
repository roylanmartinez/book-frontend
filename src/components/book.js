import React, { useState, useEffect, useRef } from "react";
// import Searcher from "./searcher";
import { useLocation } from "react-router-dom";

const Book = (props) => {
  let nName, nDescription, nCategory;
  const location = useLocation();

  const [state, setState] = useState({
    me: false,
    box: false,
    updated: false,
    prevId: false,
  });

  // const props.onHistory = useprops.onHistory();

  // useEffect(() => {

  // });
  if (props.onEditBookData) {
    // console.log(props.onEditBookData);
  }
  if (props.onMeQuery) {
    // console.log(props.onMeQuery);
  }

  if (props.onQueryBooks) {
    // console.log(props.onQueryBooks);
  }
  if (props.onEditBook) {
    // console.log(props.onEditBook);
  }

  if (
    props.onQueryBooks &&
    props.onMeQuery &&
    props.onQueryBooks.allBooks.filter(
      (item) => item.id == props.onHistory.location.pathname.split("/")[2]
    )[0]
  ) {
    if (!state.prevId) {
      setState({
        ...state,
        prevId: props.onQueryBooks.allBooks.filter(
          (item) => item.id == props.onHistory.location.pathname.split("/")[2]
        )[0].id,
      });
    }

    return (
      <div
        // onClick={() => console.log(props.onHistory.location.pathname)}
        className="Book normalDiv fadeIn"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "1000",
                fontSize: "50px",
              }}
              className="text"
            >
              {
                props.onQueryBooks.allBooks.filter(
                  (item) =>
                    item.id == props.onHistory.location.pathname.split("/")[2]
                )[0].name
              }
            </h1>
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
            <h2 className="clickable text">
              <b>Author:</b>{" "}
              {
                props.onQueryBooks.allBooks.filter(
                  (item) =>
                    item.id == props.onHistory.location.pathname.split("/")[2]
                )[0].author.username
              }
            </h2>
            <small
              onClick={() =>
                console.log(
                  props.onQueryBooks.allBooks.filter(
                    (item) =>
                      item.id == props.onHistory.location.pathname.split("/")[2]
                  )[0].author.username === props.onMeQuery.me.username
                )
              }
              className="text"
            >
              <b>Description:</b>{" "}
              {
                props.onQueryBooks.allBooks.filter(
                  (item) =>
                    item.id == props.onHistory.location.pathname.split("/")[2]
                )[0].description
              }
            </small>
            <br></br>
            <small style={{ color: "gray" }}>
              This book was published{" "}
              {props.onDifference(
                new Date(),
                new Date(
                  props.onQueryBooks.allBooks.filter(
                    (item) =>
                      item.id == props.onHistory.location.pathname.split("/")[2]
                  )[0].made
                )
              )}
            </small>
            <br></br>
            {props.onQueryBooks.allBooks.filter(
              (item) =>
                item.id == props.onHistory.location.pathname.split("/")[2]
            )[0].author.username === props.onMeQuery.me.username ? (
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p
                    onClick={() =>
                      setState({
                        state,
                        box: state.box === null ? null : true,
                      })
                    }
                    style={{
                      marginTop: "10px",
                      display:
                        state.box === true || state.box === null
                          ? "none"
                          : "block",
                    }}
                    type="button"
                    className="text clickable"
                  >
                    <u>Looking to edit your book?</u>
                  </p>
                </div>
                <br></br>

                <div
                  style={{
                    // marginTop: "10px",
                    display: state.box ? "block" : "none",
                  }}
                >
                  <h5 className="text">
                    {" "}
                    Edit your book here below{" "}
                    <i className="fas fa-arrow-down"></i>
                  </h5>

                  <input
                    ref={(node) => {
                      nName = node;
                    }}
                    // style={{ zIndex: "1000" }}
                    defaultValue={
                      props.onQueryBooks.allBooks.filter(
                        (item) =>
                          item.id ==
                          props.onHistory.location.pathname.split("/")[2]
                      )[0].name
                    }
                    placeholder="New name?"
                    // onClick={openSearcher}
                    className="input_style input_searcher"
                    type="text"
                    name="searcher2"
                  />
                  <input
                    ref={(node) => {
                      nCategory = node;
                    }}
                    defaultValue={
                      props.onQueryBooks.allBooks.filter(
                        (item) =>
                          item.id ==
                          props.onHistory.location.pathname.split("/")[2]
                      )[0].category
                    }
                    placeholder="New category?"
                    // onClick={openSearcher}
                    className="input_style input_searcher"
                    type="text"
                    name="searcher2"
                  />
                  <input
                    ref={(node) => {
                      nDescription = node;
                    }}
                    defaultValue={
                      props.onQueryBooks.allBooks.filter(
                        (item) =>
                          item.id ==
                          props.onHistory.location.pathname.split("/")[2]
                      )[0].description
                    }
                    placeholder="New description?"
                    // onClick={openSearcher}
                    className="input_style input_searcher"
                    type="text"
                    name="searcher2"
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        props.onGoHome();
                        // console.log(props.editBookData);
                        if (true) {
                          props.onEditBook({
                            variables: {
                              bookid: state.prevId,
                              name: nName.value,
                              category: nCategory.value,
                              description: nDescription.value,
                              delete: true,
                            },
                          });
                        }
                      }}
                      style={{
                        marginRight: "10px",
                        // marginTop: "10px",
                      }}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      <i className="fas fa-book"></i> Delete your book
                    </button>
                    <button
                      onClick={() => {
                        setState({
                          ...state,
                          updated: true,
                        });
                        props.onEditBook({
                          variables: {
                            bookid: props.onQueryBooks.allBooks.filter(
                              (item) =>
                                item.id ==
                                props.onHistory.location.pathname.split("/")[2]
                            )[0].id,
                            name: nName.value,
                            category: nCategory.value,
                            description: nDescription.value,
                            delete: false,
                          },
                        });
                      }}
                      type="button"
                      className="btn btn-outline-light"
                    >
                      <i className="fas fa-book"></i> Edit Book
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}

            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  } else {
    props.onGoHome();
    return <div></div>;
  }
};

export default Book;
