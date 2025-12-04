'use client';

import Link from 'next/link';

export default function TemiHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-tea-light to-accent-golden rounded-full flex items-center justify-center shadow-lg">
            <span className="text-tea-deep text-xl">🍃</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-tea-deep">Temi</h1>
            <p className="text-xs text-tea-medium">Cultivating Young Minds</p>
          </div>
        </Link>

        {/* Navigation - Simplified */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-tea-medium hover:bg-tea-muted hover:text-tea-deep transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-lg text-tea-medium hover:bg-tea-muted hover:text-tea-deep transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/schools"
            className="px-4 py-2 rounded-lg text-tea-medium hover:bg-tea-muted hover:text-tea-deep transition-colors"
          >
            Schools
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg text-tea-medium hover:bg-tea-muted hover:text-tea-deep transition-colors"
          >
            Register
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-tea-medium hover:text-tea-deep transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn-tea-primary"
          >
            Join Temi
          </Link>
        </div>
      </div>

      {/* Animated Tea Leaves */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute text-tea-light/10 animate-leaf-float" style={{left: '20%', top: '10%', fontSize: '2rem'}}>
          🍃
        </div>
        <div className="absolute text-tea-light/10 animate-leaf-float" style={{left: '50%', top: '20%', fontSize: '2rem', animationDelay: '2s'}}>
          🍃
        </div>
        <div className="absolute text-tea-light/10 animate-leaf-float" style={{left: '80%', top: '15%', fontSize: '2rem', animationDelay: '4s'}}>
          🍃
        </div>
      </div>
    </header>
  );
}
