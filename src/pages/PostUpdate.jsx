import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PenTool, Eye, EyeOff, Send } from "lucide-react";
import { fetchData, postData, updateData } from "../api/ClientFunction";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

export default function PostUpdate() {
  const [showPreview, setShowPreview] = useState(false);
  const [apiData, setApiData] = useState();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isloading, error } = useSWR(`/posts/${id}`, fetchData);
  useEffect(() => {
    if (data?.data) {
      setApiData(data?.data);
    }
  }, [data]);
  const categories = [
    { value: "tech", label: "Technology" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food & Recipes" },
    { value: "health", label: "Health & Wellness" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
    { value: "finance", label: "Finance" },
    { value: "science", label: "Science" },
    { value: "politics", label: "Politics" },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author name is required"),
    content: Yup.string().required("Content is required"),
    category: Yup.string().required("Category is required"),
    featuredImage: Yup.string()
      .url("Enter a valid URL")
      .required("Image URL is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setSubmitting(true);

    const payload = {
      title: values.title,
      authorName: values.author,
      content: values.content,
      category: [values.category],
      imageUrl: values.featuredImage,
    };

    console.log("API Payload:", payload);

    try {
      const response = await updateData(`/posts/${id}`, payload);

      if (response?.success) {
        toast.success(response.message || "Post updated successfully");
        navigate("/dashboard"); // navigate back or wherever needed
      } else {
        toast.error(response.message || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(
        error.response?.data?.message || "Server error while updating post"
      );
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 sm:p-6 lg:p-8">
      <div
        className="font-[500] flex items-center cursor-pointer  z-[999]"
        onClick={() => navigate("/dashboard")}
      >
        <IoMdArrowRoundBack />
        BACK
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Update Post
            </h1>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              title: apiData?.title || "",
              author: apiData?.authorName || "",
              content: apiData?.content || "",
              category: apiData?.category?.[0] || "",
              featuredImage: apiData?.imageUrl || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Post Title *
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500 hover:border-purple-400"
                    placeholder="Enter an engaging title"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Author Name *
                  </label>
                  <Field
                    name="author"
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500 hover:border-purple-400"
                    placeholder="Enter author's name"
                  />
                  <ErrorMessage
                    name="author"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Post Content *
                  </label>
                  <Field
                    as="textarea"
                    name="content"
                    rows="10"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500 hover:border-purple-400"
                    placeholder="Write your blog post content here..."
                  />
                  <ErrorMessage
                    name="content"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category *
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-purple-500 hover:border-purple-400"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                  <label
                    htmlFor="featuredImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Featured Image URL *
                  </label>
                  <Field
                    name="featuredImage"
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <ErrorMessage
                    name="featuredImage"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Preview Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                  >
                    {showPreview ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                    <span>{showPreview ? "Hide Preview" : "Show Preview"}</span>
                  </button>
                </div>

                {/* Preview */}
                {showPreview && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {values.title || "Post Title"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Author: {values.author || "Author Name"}
                    </p>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">
                        {values.content || "Post content will appear here..."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Publish Post</span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
