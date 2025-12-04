import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Temi - Collaborative Educational Platform',
  description: 'Where students create educational content, collaborate across schools, and get recognized',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Simple Header */}
        <header className="bg-gradient-to-r from-[#1A4D38] to-[#2D6A4F] text-white p-6 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl text-[#1A4D38] font-bold">🍃</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Temi</h1>
                <p className="text-sm text-[#D8F3DC]">Cultivating Young Minds</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="/projects" className="hover:text-[#D4AF37] transition-colors">Projects</a>
              <a href="/schools" className="hover:text-[#D4AF37] transition-colors">Schools</a>
              <a href="/register" className="hover:text-[#D4AF37] transition-colors">Register</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-[#D8F3DC] hover:text-white">Sign In</button>
              <button className="bg-[#D4AF37] text-[#1A4D38] px-6 py-2 rounded-full font-bold hover:bg-[#FF9A3C]">
                Join Temi
              </button>
            </div>
          </div>
        </header>
        
        <main>{children}</main>
        
        {/* Simple Footer */}
        <footer className="bg-[#1A4D38] text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
                <span className="text-3xl text-[#1A4D38]">🍃</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Temi Platform</h3>
              <p className="text-[#D8F3DC]">Cultivating young minds through collaboration and recognition</p>
            </div>
            <div className="border-t border-[#2D6A4F] pt-8">
              <p>© {new Date().getFullYear()} Temi Platform. All rights reserved.</p>
              <p className="mt-2 text-[#D8F3DC] text-sm">Inspired by the timeless art of tea cultivation</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
