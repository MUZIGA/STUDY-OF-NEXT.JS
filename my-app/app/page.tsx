
"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My BLOG APP</h1>
      <p className="text-gray-600">This page uses Client-Side Rendering (CSR).</p>
      <div className="mt-6 text-2xl font-mono text-indigo-600">
        {time.toLocaleTimeString()}
      </div>
    </section>
  );
}
