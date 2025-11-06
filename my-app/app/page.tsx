
"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <section className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to My Blog App
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          I’m Judith, and this site showcases my understanding of modern web development using Next.js. 
          Explore how different rendering techniques—CSR, SSR, SSG, and ISR—work together to build fast, scalable, and interactive web applications.
        </p>

        <div className="mt-8 inline-block bg-indigo-50 border border-indigo-200 rounded-xl px-6 py-4 shadow-md">
          <p className="text-indigo-600 font-mono text-3xl">
            {time.toLocaleTimeString()}
          </p>
          <p className="text-indigo-500 text-sm mt-1">Current Time</p>
        </div>
      </section>
    </main>
  );
}
