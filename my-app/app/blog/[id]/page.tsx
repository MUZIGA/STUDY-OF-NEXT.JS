"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface BlogDetailProps {
  params: { id: string };
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch {
        setError("❌ Failed to load post. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading post...</p>;

  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 font-medium">{error}</p>
        <Link href="/blog" className="text-blue-600 hover:underline mt-2 inline-block">
          ← Back to Blog List
        </Link>
      </div>
    );

  if (!post)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">⚠️ No post found.</p>
        <Link href="/blog" className="text-blue-600 hover:underline mt-2 inline-block">
          ← Back to Blog List
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.body}</p>
      <div className="mt-6">
        <Link
          href="/blog"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Blog List
        </Link>
      </div>
    </div>
  );
}
