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

  // Amabara ya category
  const categoryColors: Record<Post["category"], string> = {
    Tech: "bg-blue-100 text-blue-800",
    Lifestyle: "bg-blue-100 text-green-800",
    Education: "bg-blue-100 text-purple-800",
  };

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
      posts.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.title.toLowerCase().includes(term)
      )
    );
  }, [search, category, posts]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Search & Categories */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                category === c
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="block p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 hover:bg-indigo-50 bg-gradient-to-br from-white via-gray-50 to-white"
            >
              <h3 className="font-semibold text-gray-800 mb-2">{p.title}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${categoryColors[p.category]}`}
              >
                {p.category}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No posts found.</p>
      )}
    </div>
  );
}
