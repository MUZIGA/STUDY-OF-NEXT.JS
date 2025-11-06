// app/blog/page.tsx
import Link from "next/link";

interface Post {
  id: number;
  title: string;
}

const BlogList = async () => {
  let posts: Post[] = [];

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      console.warn("Failed to fetch posts:", res.status);
      return <p>Failed to load posts.</p>;
    }

    posts = await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <p>Failed to load posts. Check your internet connection.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="border-b pb-2">
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
