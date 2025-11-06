"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Technology", "Design", "Business", "Lifestyle"];

  // Fetch posts (CSR)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPosts(data.slice(0, 20));
        setFiltered(data.slice(0, 20));
      } catch (err) {
        setError("⚠️ Failed to load posts. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter logic (search + category)
  useEffect(() => {
    const term = search.toLowerCase();
    const filteredPosts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) &&
        (category === "All" || p.title.toLowerCase().includes(category.toLowerCase()))
    );
    setFiltered(filteredPosts);
  }, [search, category, posts]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-8 gap-8 bg-gray-50 min-h-screen">
      {/* Sidebar (Search + Categories in one card) */}
      <aside className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Explore Posts 🧭
        </h2>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-400 mt-4">
          Showing {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </p>
      </aside>

      {/* Blog content */}
      <main className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          Latest Blog Posts
        </h1>

        {loading && (
          <div className="text-center text-gray-500">Loading posts...</div>
        )}

        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}

        {!loading && !error && (
          <>
            {filtered.length > 0 ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.id}`}
                      className="block bg-gray-50 hover:bg-indigo-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all h-full"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-indigo-600 font-medium">
                        Read more →
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No posts found matching “{search}”.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
