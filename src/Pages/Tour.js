import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTour } from "../redux/slice/tourSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { error, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTourHandler = (e) => {
    e.preventDefault();
    if ((title, description, image)) {
      dispatch(
        addTour({
          name: user?.result?.name,
          user: user?.result?._id,
          title,
          description,
          image,
          toast,
          navigate,
        })
      );
    }
  };
  useEffect(() => {
    error && toast.error("Adding tour Failed");
  }, [error]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="addtourWrapper">
        <h1>Add Tour</h1>
        <Form onSubmit={addTourHandler}>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              //   value={description}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          {loading ? (
            <Loader />
          ) : (
            <div className="buttondiv">
              <button type="Submit">Add Tour</button>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Tour;
