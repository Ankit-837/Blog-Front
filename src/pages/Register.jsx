import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../api/ClientFunction";
import { toast } from "react-toastify";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setIsLogin, setToken, setUser } = useAuth();
  // Validation Schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial Values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Submit Handler
  const handleSubmit = async (values) => {
    console.log("Form Data:", values);
    const response = await postData("/auth/register", values);
    console.log("this is  resopnce of data", response);
    if (response.success) {
      toast.success(response.message || "Registered successfully!");
      setIsLogin(true);
      setToken(response?.token);
      setUser(response?.user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 sm:p-6 lg:p-8px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Create an account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
