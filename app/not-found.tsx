import Link from 'next/link';
import { ChefHat, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="text-center">
        <ChefHat className="w-24 h-24 mx-auto mb-6 text-orange-500 animate-bounce" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
