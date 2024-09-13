import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation
import axiosClient from "../../api/interceptorApi"; // Corrected import path
import "./Login.scss";

const Login = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initial values for Formik
  const initialValues = {
    email: "",
    password: "",
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().when("isEmailVerified", {
      is: true,
      then: Yup.string().required("Password is required"),
    }),
  });
const handleSubmit = async (values, { setSubmitting }) => {
  if (!isEmailVerified) {
    try {
      // Verify email using the API endpoint
      const response = await axiosClient.post("/accounts/verify-email/", { email: values.email });
      console.log("Response data:", response.data);
      if (response.status === 200) {
        console.log("%%%%%%%%%%%%%%%%%%%%")
        setIsEmailVerified(true);
        setErrorMessage(""); // Clear any previous error messages
        console.log("Faild data iss")
      } else {
        setErrorMessage("Email does not exist. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to verify email. Please try again.");
      console.error("Email verification failed", error);
    }
  } else {
    try {
      // Proceed with the login since the email is verified
      const response = await axiosClient.post("/accounts/user-sign/", {
        email: values.email,
        password: values.password,
      });
      console.log("Logged in successfully", response.data);
      // Perform further actions such as saving token, redirecting, etc.
    } catch (error) {
      setErrorMessage("Login failed. Please check your password and try again.");
      console.error("Login failed", error);
    }
  }

  setSubmitting(false);
};

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, submitForm }) => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setFieldValue("email", e.target.value);
                setIsEmailVerified(false); // Reset email verification state when typing
                setErrorMessage(""); // Clear error messages when typing
              }}
            />
            <ErrorMessage name="email" component="div" className="error" />
            <button
              type="button"
              onClick={() => submitForm()}
              disabled={isSubmitting || isEmailVerified}
            >
              Continue
            </button>

            {isEmailVerified && (
              <div className="password-section">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </div>
            )}

            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
