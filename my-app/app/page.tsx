export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D8F3DC] to-[#FFFDF5] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-[#40916C] to-[#D4AF37] rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-8xl animate-pulse">🍃</span>
          </div>
          
          <h1 className="text-6xl font-bold text-[#1A4D38] mb-6">
            Welcome to <span className="text-[#D4AF37]">Temi</span>
          </h1>
          
          <p className="text-2xl text-[#2D6A4F] mb-10 max-w-3xl mx-auto">
            Where students create educational content, collaborate across schools, 
            and get recognized through our gamified tea garden reward system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-[#2D6A4F] text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-[#1A4D38] transition-colors shadow-lg">
              Start Growing 🌱
            </button>
            <button className="border-3 border-[#40916C] text-[#1A4D38] px-10 py-4 rounded-full text-xl font-bold hover:bg-[#D8F3DC] transition-colors">
              Explore Platform
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#40916C]">
            <div className="text-4xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-[#1A4D38] mb-3">School Network</h3>
            <p className="text-gray-600">Join HomeHub-approved schools and collaborate across institutions</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#40916C]">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-[#1A4D38] mb-3">Student Creation</h3>
            <p className="text-gray-600">Create educational projects, STEM work, and creative content</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#40916C]">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-[#1A4D38] mb-3">Reward System</h3>
            <p className="text-gray-600">Earn Kali, Iendee, Chania, Tana, and Nile rewards</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-[#1A4D38] to-[#2D6A4F] text-white rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1,200+</div>
              <div className="text-[#D8F3DC]">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">45+</div>
              <div className="text-[#D8F3DC]">Partner Schools</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5,800+</div>
              <div className="text-[#D8F3DC]">Projects Created</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24,500+</div>
              <div className="text-[#D8F3DC]">Rewards Given</div>
            </div>
          </div>
        </div>

        {/* Tea Garden Colors */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1A4D38] mb-8">Tea Garden Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="h-32 bg-[#1A4D38] rounded-xl flex items-center justify-center text-white text-lg font-bold">
              Tea Deep
            </div>
            <div className="h-32 bg-[#2D6A4F] rounded-xl flex items-center justify-center text-white text-lg font-bold">
              Tea Medium
            </div>
            <div className="h-32 bg-[#40916C] rounded-xl flex items-center justify-center text-white text-lg font-bold">
              Tea Light
            </div>
            <div className="h-32 bg-[#D4AF37] rounded-xl flex items-center justify-center text-lg font-bold">
              Golden Tip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
