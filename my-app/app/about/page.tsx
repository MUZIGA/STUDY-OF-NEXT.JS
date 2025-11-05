
export const dynamic = "force-dynamic"; 

export default async function AboutPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  const author = await res.json();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">About the Author (SSR)</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Name:</strong> {author.name}</p>
        <p><strong>Email:</strong> {author.email}</p>
        <p><strong>Company:</strong> {author.company.name}</p>
      </div>
    </section>
  );
}
