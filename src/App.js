import "./styles/app.scss";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slice/authSlice";
import Tour from "./Pages/Tour";
import Dashboard from "./Pages/Dashboard";
import SingleTour from "./Pages/SingleTour";
import EditTour from "./Pages/EditTour";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <>
      <Header />
      <div className="contentWrapper">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />

          <Route path="/addtour" element={<Tour />} />
          <Route path="/edittour/:id" element={<EditTour />} />
          <Route path="/tour/:id" element={<SingleTour />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
