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

  // Fetch posts using CSR
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPosts(data.slice(0, 20)); // limit to 20 for demo
        setFiltered(data.slice(0, 20));
      } catch (err) {
        setError("Failed to load posts. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by title
  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(posts.filter((p) => p.title.toLowerCase().includes(term)));
  }, [search, posts]);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-8">
      {/* Sidebar for search */}
      <aside className="w-full md:w-1/3 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Search Posts 🔍
        </h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </aside>

      {/* Blog list */}
      <main className="flex-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Blog Posts
        </h1>

        {loading && <p className="text-gray-500 text-center">Loading posts...</p>}

        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <>
            {filtered.length > 0 ? (
              <ul className="grid gap-4">
                {filtered.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.id}`}
                      className="block bg-gray-50 hover:bg-indigo-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-4">No posts found.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
