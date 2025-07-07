import React, { useState, useEffect } from "react";
import { Trash2, Edit3, Clock, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { deleteData, fetchData } from "../api/ClientFunction";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const PostPage = () => {
  const [isLoading, setIsLoading] = useState({ update: false, delete: false });
  const { user } = useAuth();
  console.log("thi si user", user);
  const [isVisible, setIsVisible] = useState(false);
  const [apiData, setApiData] = useState([]);
  const { id } = useParams();
  const { data, isloading, error } = useSWR(`/posts/${id}`, fetchData);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    if (data?.data) {
      setApiData(data?.data);
    }
  }, [data]);
  console.log("this is the data", apiData);

  const handleUpdate = async () => {
    navigate(`/updatepost/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading({ ...isLoading, delete: true });
      const response = await deleteData(`/posts/${id}`);
      console.log("thisis response", response);
      if (response.success) {
        toast.success(response.message || "Successfully Deleted");
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Failed to update post");
        console.log("this is error");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(
        error.response?.data?.message || "Server error while updating post"
      );
    } finally {
      setIsLoading({ ...isLoading, delete: false });
    }
  };
  if (isloading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-4 sm:p-6 lg:p-8">
      <div
        className="font-[500] flex items-center cursor-pointer  z-[999]"
        onClick={() => navigate("/dashboard")}
      >
        <IoMdArrowRoundBack />
        BACK
      </div>
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Container */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                {apiData?.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm sm:text-base opacity-90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(apiData.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{apiData?.authorName}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm sm:text-base opacity-90">
                <div className="flex items-center gap-2">
                  <span>{apiData?.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                {apiData?.content}
              </p>
            </div>
          </div>

          {apiData?.author?._id === user?._id ||
            (user?.role === "superadmin" && (
              <div className="bg-gray-50/80 backdrop-blur-sm px-6 sm:px-8 lg:px-12 py-6 sm:py-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading.update || isLoading.delete}
                    className={`group relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isLoading.update ? "animate-pulse" : ""
                    }`}
                  >
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading.update ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Update Blog</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(apiData?._id)}
                    disabled={isLoading.update || isLoading.delete}
                    className={`group relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isLoading.delete ? "animate-pulse" : ""
                    }`}
                  >
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading.delete ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Delete Blog</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
