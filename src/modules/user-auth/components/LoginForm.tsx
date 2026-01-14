"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import styles from "./LoginForm.module.scss";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values.email, values.password);
  };

  return (
    <div className={styles.loginForm}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={styles.input}
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || loading}
            >
              {loading || isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
