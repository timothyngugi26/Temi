import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Temi</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Education Rewards System - Motivating students through achievements
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="text-3xl font-bold text-blue-600 mb-2">🏫</div>
            <h3 className="text-lg font-semibold mb-2">Schools</h3>
            <p className="text-gray-600">Manage educational institutions</p>
            <Link href="/schools" className="inline-block mt-4 text-blue-600 hover:text-blue-800">
              View Schools →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="text-3xl font-bold text-green-600 mb-2">👨‍🎓</div>
            <h3 className="text-lg font-semibold mb-2">Students</h3>
            <p className="text-gray-600">Track progress and rewards</p>
            <Link href="/students" className="inline-block mt-4 text-green-600 hover:text-green-800">
              View Students →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="text-3xl font-bold text-purple-600 mb-2">📚</div>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <p className="text-gray-600">Assign and grade work</p>
            <Link href="/projects" className="inline-block mt-4 text-purple-600 hover:text-purple-800">
              View Projects →
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/api/data" className="p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Database Status</div>
              <div className="text-sm text-gray-500">Check connection</div>
            </Link>
            
            <Link href="/schools" className="p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">All Schools</div>
              <div className="text-sm text-gray-500">Browse institutions</div>
            </Link>
            
            <Link href="/admin" className="p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Admin Panel</div>
              <div className="text-sm text-gray-500">System management</div>
            </Link>
            
            <Link href="/rewards" className="p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Rewards</div>
              <div className="text-sm text-gray-500">View available rewards</div>
            </Link>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Check the database connection at <code className="bg-blue-100 px-2 py-1 rounded">/api/data</code></li>
            <li>Browse schools at <code className="bg-blue-100 px-2 py-1 rounded">/schools</code></li>
            <li>View sample projects at <code className="bg-blue-100 px-2 py-1 rounded">/projects</code></li>
            <li>Explore the admin interface at <code className="bg-blue-100 px-2 py-1 rounded">/admin</code></li>
          </ol>
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> The database is located at <code>/tmp/temi-db.sqlite</code>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
