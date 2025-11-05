// app/blog/layout.tsx
import React from "react";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-3">Categories</h3>
        <ul className="space-y-2 text-gray-700">
          <li>Tech</li>
          <li>Lifestyle</li>
          <li>Education</li>
        </ul>
      </aside>

      {/* Main Blog Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
