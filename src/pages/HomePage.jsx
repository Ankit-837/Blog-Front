import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Eye, Heart, Share2 } from "lucide-react";

const BlogHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What's Next in 2025",
      excerpt:
        "Exploring emerging technologies and trends that will shape the web development landscape in the coming year.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      readTime: "8 min read",
      category: "Technology",
    },
    {
      id: 2,
      title: "Building Scalable Applications with Modern Architecture",
      excerpt:
        "A comprehensive guide to designing applications that can grow with your business needs.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      author: "Michael Chen",
      date: "March 12, 2025",
      readTime: "12 min read",
      category: "Architecture",
    },
    {
      id: 3,
      title: "The Art of User Experience: Creating Intuitive Interfaces",
      excerpt:
        "Understanding the principles behind great UX design and how to apply them to your projects.",
      image:
        "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=400&fit=crop",
      author: "Emma Rodriguez",
      date: "March 10, 2025",
      readTime: "6 min read",
      category: "Design",
    },
  ];

  const recentPosts = [
    {
      id: 4,
      title: "Mastering React Hooks for Better State Management",
      excerpt:
        "Deep dive into advanced React hooks patterns and best practices for modern applications.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      author: "David Kim",
      date: "March 8, 2025",
      readTime: "10 min read",
      views: "2.3k",
      likes: "156",
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt:
        "A practical comparison of CSS layout methods with real-world examples and use cases.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      author: "Lisa Wang",
      date: "March 5, 2025",
      readTime: "7 min read",
      views: "1.8k",
      likes: "89",
    },
  ];

  const categories = [
    { name: "Technology", count: 45, color: "bg-blue-500" },
    { name: "Design", count: 32, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 my-[71px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Stories & Ideas
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of writers and readers. Explore insightful
              articles on technology, design, and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105">
                Start Reading
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                Write Your Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Featured Articles
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post, index) => (
                  <div key={post.id} className="w-full flex-shrink-0 relative">
                    <div className="relative h-96 md:h-[500px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="max-w-2xl">
                          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {post.category}
                          </span>
                          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-blue-200 text-sm">
                            <User className="w-4 h-4 mr-2" />
                            <span className="mr-4">{post.author}</span>
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="mr-4">{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Recent Articles
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
              View All
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post, index) => (
              <article
                key={post.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-4 h-4 text-slate-600 hover:text-red-500 transition-colors cursor-pointer" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-500">{post.date}</span>
                    <span className="text-sm text-blue-600 font-medium">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`${category.color} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform duration-200 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80">{category.count} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 text-lg mb-8">
            Get the latest articles delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">BlogSpace</span>
              </div>
              <p className="text-slate-400">
                Empowering writers and readers with quality content and engaging
                stories.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Share2 className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Share2 className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Share2 className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 BlogSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogHomepage;
