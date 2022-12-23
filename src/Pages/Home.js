import React from "react";
import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/slice/tourSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import PaginationPage from "../components/Pagination";
const Home = () => {
  const dispatch = useDispatch();
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + "...";
    }
    return str;
  };
  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);
  useEffect(() => {
    dispatch(getTours());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <h1>Tours</h1>
            <Row className="mt-3">
              {tours &&
                tours?.map((item) => {
                  return (
                    <>
                      <Col md={4} className="mt-5">
                        <div className="tourWrapper">
                          <figure>
                            <img
                              src={`${process.env.REACT_APP_IMAGE_PREFIX}${item?.image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </figure>
                          <div className="contentWrapper">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>{item?.title}</h4>
                              <h4>{item?.name}</h4>
                            </div>

                            <p>
                              {excerpt(item?.description)}{" "}
                              <Link to={`/tour/${item?._id}`}>Read More</Link>
                            </p>
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}
            </Row>
            <PaginationPage
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              dispatch={dispatch}
              numberOfPages={numberOfPages}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
