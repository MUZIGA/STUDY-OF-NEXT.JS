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

const BlogDetail = async ({ params }: BlogDetailProps) => {
  if (!params?.id) return <p>Invalid post ID.</p>;

  let post: Post | null = null;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`,
      { next: { revalidate: 10 } }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch post. Status: ${res.status}`);
      return <p>Post not found or unavailable.</p>;
    }

    post = await res.json();
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return <p>Failed to load post. Check your connection.</p>;
  }

  if (!post) return <p>Post data is missing.</p>;

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
