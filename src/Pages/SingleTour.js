import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTourByID } from "../redux/slice/tourSlice";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

const SingleTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => ({ ...state.tour }));

  useEffect(() => {
    if (id) {
      dispatch(getTourByID(id));
    }
  }, [id]);
  return (
    <div>
      <Container>
        <figure className="mt-3">
          <img
            // src=""
            src={`${process.env.REACT_APP_IMAGE_PREFIX}${tour?.image}`}
            alt=""
            className="img-fluid"
          />
        </figure>
        <div className="desc-contentWrapper">
          <h4>{tour?.title}</h4>
          <h5>Created By: {tour?.name}</h5>
          <h5>
            Created At: <Moment format="YYYY/MM/DD">{tour?.createdAt}</Moment>{" "}
          </h5>
          <p>{tour?.description}</p>
        </div>
      </Container>
    </div>
  );
};

export default SingleTour;
