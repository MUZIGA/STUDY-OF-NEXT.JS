// app/blog/page.tsx
export const revalidate = 3600; // revalidate every hour (SSG)

export default async function BlogPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Blog Posts (SSG)</h2>
      <ul className="space-y-4">
        {posts.slice(0, 5).map((post: any) => (
          <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <a href={`/blog/${post.id}`} className="text-indigo-600 hover:underline text-lg font-semibold">
              {post.title}
            </a>
            <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
