import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosClient from "../../api/interceptorApi";
import { CONFIG } from "../../api/config";
import "./Register.scss";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const roleId = CONFIG.USER_ROLE_ID;

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    if (!roleId) {
      setErrorMessage("Registration is not configured. Please contact support.");
      setSubmitting(false);
      return;
    }
    try {
      await axiosClient.post("/api/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        roleId,
      });
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message ?? error.response?.data?.error ?? "Registration failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <p className="register-login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
