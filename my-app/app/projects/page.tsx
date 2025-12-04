'use client';

import { useEffect, useState } from 'react';

// Mock data for now
const mockProjects = [
  {
    id: '1',
    title: 'AI-Powered Irrigation System',
    description: 'An IoT system that uses machine learning to optimize water usage in agriculture',
    type: 'STEM',
    tags: 'AI,IoT,Agriculture,Sustainability',
    rewards: 45,
    featured: true,
    creator: { name: 'Sarah Mwangi' },
    school: { name: 'Green Valley High' },
  },
  {
    id: '2',
    title: 'Mathematical Art Gallery',
    description: 'Digital art created using mathematical equations and algorithms',
    type: 'CREATIVE',
    tags: 'Math,Art,Creative',
    rewards: 32,
    featured: false,
    creator: { name: 'David Omondi' },
    school: { name: 'STEM Academy' },
  },
  {
    id: '3',
    title: 'Renewable Energy Research',
    description: 'Study on solar panel efficiency in urban environments',
    type: 'RESEARCH',
    tags: 'Science,Energy,Research',
    rewards: 67,
    featured: true,
    creator: { name: 'James Kariuki' },
    school: { name: 'Tech Institute' },
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch from API if available
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.log('Using mock data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-tea-muted to-accent-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tea-medium mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-tea-deep">Loading projects...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-tea-muted to-accent-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-tea-deep mb-8 text-center">
          Student Projects
        </h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-tea-light to-tea-medium text-white p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold mb-2">{projects.length}</div>
            <div className="text-sm">Total Projects</div>
          </div>
          <div className="bg-gradient-to-r from-accent-golden to-accent-sunrise text-white p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-sm">Featured</div>
          </div>
          <div className="bg-gradient-to-r from-tea-medium to-tea-deep text-white p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold mb-2">
              {projects.reduce((acc, p) => acc + (p.rewards || 0), 0)}
            </div>
            <div className="text-sm">Total Rewards</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-tea-light text-white p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold mb-2">
              {[...new Set(projects.map(p => p.school?.name).filter(Boolean))].length}
            </div>
            <div className="text-sm">Participating Schools</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const tags = project.tags ? project.tags.split(',') : [];
            
            return (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-tea-light hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="bg-tea-light text-white px-3 py-1 rounded-full text-sm">
                      {project.type}
                    </span>
                  </div>
                  {project.featured && (
                    <span className="bg-accent-golden text-tea-deep px-3 py-1 rounded-full text-sm font-bold">
                      🌟 Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-tea-deep mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-tea-muted text-tea-deep text-sm rounded-full">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">👤</span>
                    {project.creator?.name || 'Unknown Creator'}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🏫</span>
                    {project.school?.name || 'Unknown School'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="bg-tea-medium text-white px-4 py-2 rounded-lg text-sm hover:bg-tea-deep transition-colors">
                    View Project
                  </button>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Rewards</div>
                    <div className="font-bold text-accent-golden">{project.rewards || 0} ⭐</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
