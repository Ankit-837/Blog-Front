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

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/createpost" element={<BlogPostPage />} />
          <Route path="/updatepost/:id" element={<PostUpdate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
