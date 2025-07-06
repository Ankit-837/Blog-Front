import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  BookOpen,
  TrendingUp,
  Clock,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { fetchData } from "../api/ClientFunction";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

const BlogDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const { data, error, isloading } = useSWR("/posts", fetchData);
  console.log("this is data", data);
  useEffect(() => {
    if (data?.data) {
      setApiData(data.data);
    }
  }, [data]);
  console.log("this is data", apiData);
  const categories = [
    { id: "all", name: "All Articles", count: apiData.length },
    ...Array.from(new Set(apiData.flatMap((post) => post.category))).map(
      (cat) => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: apiData.filter((post) => post.category.includes(cat)).length,
      })
    ),
  ];

  const blogs = apiData.map((post) => ({
    id: post._id,
    title: post.title,
    excerpt: post.content.slice(0, 150) + "...",
    content: post.content,
    image: post.imageUrl || "https://source.unsplash.com/random/400x250?blog",
    author: post.authorName || post.author?.username || "Unknown",
    date: new Date(post.createdAt).toISOString(),
    category: post.category[0] || "general",
    tags: post.category,
    status: "published",
    featured: false,
  }));

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date) - new Date(a.date);

      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <Navbar />

      {/* Stats Section */}
      <div className="max-w-7xl my-[70px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-50 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-50 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="latest">Latest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}

        {/* Blog Posts Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}
        >
          {sortedBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up ${
                viewMode === "list" ? "flex flex-col md:flex-row" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list" ? "md:w-80 flex-shrink-0" : ""
                }`}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className={`w-full object-cover transition-transform duration-300 hover:scale-110 ${
                    viewMode === "list" ? "h-48 md:h-full" : "h-48"
                  }`}
                />
                {blog.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="w-4 h-4 text-slate-600 hover:text-red-500 transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {blog.category}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      blog.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Read Time */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Share2 className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                      onClick={() => navigate(`/posts/${blog.id}`)} // ✅ use blog.id instead of blog._id
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {sortedBlogs.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Load More Articles
            </button>
          </div>
        )}

        {/* No Results */}
        {sortedBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No articles found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogDashboard;
