import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostPage from "./pages/PostPage";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogPostPage from "./pages/BlogPostPage";
import PostUpdate from "./pages/PostUpdate";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createpost"
            element={
              <ProtectedRoute>
                <BlogPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatepost/:id"
            element={
              <ProtectedRoute>
                <PostUpdate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
