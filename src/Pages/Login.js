import React from "react";
import { useState, useEffect } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoginUser, RegisterUser } from "../redux/slice/authSlice";
import Loader from "../components/Loader";
import { GoogleLogin } from "react-google-login";
const Login = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginPasswordErr, setLoginPasswordErr] = useState(false);
  const [loginEmailErr, setLoginEmailErr] = useState(false);
  const [registerNameErr, setRegisterNameErr] = useState(false);
  const [registerPasswordErr, setRegisterPasswordErr] = useState(false);
  const [registerEmailErr, setRegisterEmailErr] = useState(false);

  const [visible, setVisible] = useState(false);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(LoginUser({ email, password, navigate, toast }));
    }
    setEmail("");
    setPassword("");
  };
  // const togglePassword = () => {

  // };
  const handleRegister = (e) => {
    e.preventDefault();
    if (firstname && lastname && email && password) {
      dispatch(RegisterUser({ firstname, lastname, email, password, toast }));
    }
    if (!error) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };
  const googleSuccess = () => {};
  const googleFailure = () => {};
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      <div className="login-page">
        <Tabs defaultActiveKey="login" id="fill-tab-example" className="mb-3">
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLogin}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {loginEmailErr && email.length <= 0 && (
                <p className="register-error">Full Name is required</p>
              )}
              <div className="passwordshowhide">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>{" "}
                <span onClick={() => setVisible(!visible)}>
                  {visible ? "hide" : "Show"}
                </span>
                {/* {show ? (
                  <span onClick={() => togglePassword}>hide</span>
                ) : (
                  <span onClick={() => togglePassword}>show</span>
                )} */}
                {/* <span onClick={()=>set}>hide</span>
              <span>show</span> */}
              </div>
              {loginPasswordErr && password.length <= 0 && (
                <p className="register-error">Password is required</p>
              )}
              {loading ? (
                <Loader />
              ) : (
                <div className="buttondiv">
                  <button type="Submit">Login</button>
                </div>
              )}
              <br />
              <GoogleLogin
                clientId=".."
                render={(renderProps) => {
                  <div className="buttondiv">
                    <button type="Submit">Login</button>
                  </div>;
                  // <button
                  //   onClick={renderProps.onClick}
                  //   disabled={renderProps.disabled}
                  // >
                  //   Login with Google
                  // </button>
                }}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </Form>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Form onSubmit={handleRegister}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              {/* {registerNameErr && name.length <= 0 && (
                <p className="register-error">Full Name is required</p>
              )} */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              {/* {registerNameErr && name.length <= 0 && (
                <p className="register-error">Full Name is required</p>
              )} */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {registerEmailErr && email.length <= 0 && (
                <p className="register-error">Email is required</p>
              )}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>{" "}
              {registerPasswordErr && password.length <= 0 && (
                <p className="register-error">Password is required</p>
              )}
              {loading ? (
                <Loader />
              ) : (
                <div className="buttondiv">
                  <button type="Submit">Register</button>
                </div>
              )}
            </Form>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Login;
