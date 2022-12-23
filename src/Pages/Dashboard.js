import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTours,
  getTourByID,
  getToursByUser,
} from "../redux/slice/tourSlice";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading, success } = useSelector((state) => ({
    ...state.tour,
  }));
  const userID = user?.result?._id;
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + "...";
    }
    return str;
  };
  const deleteSingleTour = (id) => {
    if (window.confirm("Are you sure want to delete this tour?")) {
      dispatch(deleteTours({ id, toast }));
    }
  };
  const editSingleTour = (id) => {
    if (id) {
      navigate(`/edittour/${id}`);
    }
  };
  useEffect(() => {
    if (userID) {
      dispatch(getToursByUser(userID));
    }
  }, [userID]);
  useEffect(() => {
    if (success) {
      dispatch(getToursByUser(userID));
    }
  }, [success]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          {userTours?.tours?.length === 0 ? (
            <h1>No Tours with this User</h1>
          ) : (
            <div>
              <h1 className="heading">Dashboard:{user?.result?.name}</h1>
              {userTours?.tours &&
                userTours?.tours.map((item) => {
                  return (
                    <>
                      <div className="singletourWrapper mb-4">
                        <div className="d-flex justify-content-between">
                          <figure>
                            <img
                              src={`${process.env.REACT_APP_IMAGE_PREFIX}${item?.image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </figure>
                          <div className=" mt-5 me-4">
                            <h4>{item?.title}</h4>
                            <p>{excerpt(item?.description)}</p>
                          </div>
                          <div className=" mt-5 d-flex justify-content-between ">
                            <AiFillEdit
                              className="editicon"
                              onClick={() => editSingleTour(item?._id)}
                            />
                            <IoMdTrash
                              className="deleteicon"
                              onClick={() => deleteSingleTour(item?._id)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
