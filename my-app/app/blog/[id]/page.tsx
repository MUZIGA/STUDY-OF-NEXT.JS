
interface Params {
  params: { id: string };
}

export default async function BlogDetail({ params }: Params) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    next: { revalidate: 10 }, 
  });
  const post = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </main>
  );
}
