
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  const author = await res.json();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <section className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">The Author (SSR)</h2>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-md space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {author.name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {author.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Company:</span> {author.company.name}
          </p>
        </div>
      </section>
    </main>
  );
}

