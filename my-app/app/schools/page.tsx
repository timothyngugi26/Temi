import { db } from '@/lib/db';

export default async function SchoolsPage() {
  const schools = await db.school.findMany({
    include: {
      users: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-muted to-accent-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-tea-deep mb-8 text-center">
          Partner Schools
        </h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-r from-tea-light to-tea-medium text-white p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold mb-2">{schools.length}</div>
            <div className="text-lg">Active Schools</div>
          </div>
          <div className="bg-gradient-to-r from-accent-golden to-accent-sunrise text-white p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold mb-2">
              {schools.reduce((acc, school) => acc + school.users.length, 0)}
            </div>
            <div className="text-lg">Active Members</div>
          </div>
          <div className="bg-gradient-to-r from-tea-medium to-tea-deep text-white p-8 rounded-2xl text-center">
            <div className="text-4xl font-bold mb-2">
              {schools.filter(s => s.homehubApproved).length}
            </div>
            <div className="text-lg">HomeHub Approved</div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-tea-light hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-tea-deep mb-2">{school.name}</h3>
                  {school.homehubApproved && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <span className="text-lg">✅</span>
                      HomeHub Approved
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-tea-deep">{school.users.length}</div>
                  <div className="text-xs text-tea-medium">members</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 line-clamp-3">
                {school.description || 'No description provided'}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">📍</span>
                  {school.location || 'Location not specified'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">📧</span>
                  {school.email}
                </div>
                {school.homehubRef && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🆔</span>
                    {school.homehubRef}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <button className="bg-tea-medium text-white px-4 py-2 rounded-lg text-sm hover:bg-tea-deep transition-colors">
                  View Details
                </button>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Joined</div>
                  <div className="text-sm font-medium">
                    {new Date(school.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
