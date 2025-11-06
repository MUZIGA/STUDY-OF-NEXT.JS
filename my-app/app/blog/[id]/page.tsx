// app/blog/[id]/page.tsx
import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface BlogDetailProps {
  params: { id: string };
}

// Utility component for fallback/error messages
const Message = ({ text }: { text: string }) => (
  <div className="max-w-3xl mx-auto p-4">
    <p>{text}</p>
    <a href="/blog" className="text-blue-600 hover:underline mt-2 inline-block">
      ← Back to Blog List
    </a>
  </div>
);

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const id = params?.id;

  // Handle missing/invalid ID
  if (!id) return <Message text="Invalid post ID." />;

  let post: Post | null = null;

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return <Message text="Post not found or unavailable." />;

    post = await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return <Message text="Failed to load post. Check your internet connection." />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p>{post.body}</p>
      <div className="mt-4">
        <a href="/blog" className="text-blue-600 hover:underline">
          ← Back to Blog List
        </a>
      </div>
    </div>
  );
};

export default BlogDetail;
