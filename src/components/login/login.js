import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/navbar";
import "./login.scss";

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
    setIsLoggedIn(true);
    navigate("/movies");
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <NavBar displayLogout={false} />
      <div className="login-page shadow-lg p-3 pt-4 mx-auto rounded d-flex align-center ">
        <div className="container pt-4 bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form>
                <h6 className="text-secondary text-center">
                  Please log in to continue!
                </h6>
                <div className="my-4">
                  <Field
                    autoFocus
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-5">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  onSubmit={handleSubmit}
                  className="btn btn-primary mx-auto d-block w-100"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
