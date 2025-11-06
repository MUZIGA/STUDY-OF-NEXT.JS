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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Tech", "Lifestyle", "Education"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPosts(data.slice(0, 20));
        setFiltered(data.slice(0, 20));
      } catch {
        setError("⚠️ Failed to load posts. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const results = posts.filter((p) =>
      p.title.toLowerCase().includes(term)
    );
    setFiltered(
      selectedCategory === "All"
        ? results
        : results.filter((p) =>
            p.title.toLowerCase().includes(selectedCategory.toLowerCase())
          )
    );
  }, [search, posts, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-8 gap-8 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Discover Posts 📰
        </h2>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {search && (
          <p className="text-sm text-gray-500 mb-4">
            Found {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Blog content */}
      <main className="flex-1 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
           Blog Posts
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
