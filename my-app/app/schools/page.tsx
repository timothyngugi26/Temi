"use client"

import { useState, useEffect } from 'react'

interface School {
  id: string
  name: string
  email: string | null
  homeHubApproved: boolean
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSchools() {
      try {
        const response = await fetch('/api/data')
        const data = await response.json()
        
        if (data.success && data.recentSchools) {
          setSchools(data.recentSchools)
        } else {
          setError(data.message || 'Failed to load schools')
        }
      } catch (err) {
        setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'))
      } finally {
        setLoading(false)
      }
    }
    
    loadSchools()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Schools</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schools</h1>
          <p className="text-gray-600 mt-2">Educational institutions in the system</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Total Schools: {schools.length}</span>
              </div>
              <div className="text-sm text-gray-500">
                Showing recent entries
              </div>
            </div>
          </div>

          <div className="divide-y">
            {schools.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No schools found in the database
              </div>
            ) : (
              schools.map((school) => (
                <div key={school.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">🏫</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{school.name}</h3>
                        <p className="text-gray-600 text-sm">{school.email || 'No email'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {school.homeHubApproved ? (
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold mb-4">Database Information</h3>
          <p className="text-sm text-gray-600">
            Schools are loaded from the SQLite database at <code className="bg-gray-200 px-2 py-1 rounded">/tmp/temi-db.sqlite</code>
          </p>
          <div className="mt-4">
            <a 
              href="/api/data" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              View raw API data
              <span className="ml-2">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
