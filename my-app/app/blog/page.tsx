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
      return (
        <div className="text-center text-red-600 mt-8">
          Failed to load posts.
        </div>
      );
    }

    posts = await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="text-center text-red-600 mt-8">
        Failed to load posts. Check your internet connection.
      </div>
    );
  }

  return (
    <main className="flex justify-center min-h-screen bg-gray-50 p-6">
      <section className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Blog Posts
        </h1>

        <div className="grid gap-6">
          {posts.slice(0, 10).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogList;
