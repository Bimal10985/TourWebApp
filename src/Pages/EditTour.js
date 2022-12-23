import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTourByID, updateTour } from "../redux/slice/tourSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useParams, useNavigate } from "react-router-dom";

const EditTour = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const { tour, error, loading } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const editTourHandler = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTour({ id, title, description, toast, navigate }));
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getTourByID(id));
    }
  }, [id]);
  useEffect(() => {
    if (tour) {
      setTitle(tour?.title);
      setDescription(tour?.description);
    }
  }, [tour]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="addtourWrapper">
        <h1>Edit Tour</h1>
        <Form onSubmit={editTourHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tour Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tour Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              //   value={description}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group> */}

          {loading ? (
            <Loader />
          ) : (
            <div className="buttondiv">
              <button type="Submit">Update Tour</button>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default EditTour;
