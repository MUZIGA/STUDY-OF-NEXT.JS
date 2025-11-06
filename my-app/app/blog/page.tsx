"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  category: "Tech" | "Lifestyle" | "Education";
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | Post["category"]>("All");
  const [loading, setLoading] = useState(true);

  const categories: ("All" | Post["category"])[] = ["All", "Tech", "Lifestyle", "Education"];

  // Fetch posts & assign random categories
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const postsWithCat: Post[] = data.slice(0, 20).map((p: any, i: number) => ({
          id: p.id,
          title: p.title,
          category: categories[(i % (categories.length - 1)) + 1] as Post["category"],
        }));
        setPosts(postsWithCat);
        setFiltered(postsWithCat);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      posts.filter((p) => (category === "All" || p.category === category) && p.title.toLowerCase().includes(term))
    );
  }, [search, category, posts]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-white p-5 rounded-xl shadow border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-center">Discover Posts</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                category === c ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </aside>

      {/* Blog list */}
      <main className="flex-1 bg-white p-5 rounded-xl shadow border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filtered.length > 0 ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.id}`}
                  className="block p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 shadow transition"
                >
                  <h3 className="font-semibold text-gray-800">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase">{p.category}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </main>
    </div>
  );
}
