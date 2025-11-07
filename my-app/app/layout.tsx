
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata = {
  title: "Next.js Assignment",
  description: "Next.js rendering demo by Judith",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col">
        <ThemeProvider>
          {/* Header / Navbar */}
          <header className="bg-indigo-600 dark:bg-indigo-800 text-white py-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-4">
              <h1 className="text-xl font-bold">Judith</h1>
              <div className="space-x-6">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 text-center py-4 mt-8">
            © {new Date().getFullYear()} Judith | Blog
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
