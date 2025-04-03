'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LandingPage() {
  const router = useRouter()

  const templates = [
    {
      id: 'modern-teal',
      name: 'Modern Teal',
      description: 'A modern two-column layout with a professional teal sidebar',
      image: '/templates/modern-teal-preview.png',
    },
    // More templates can be added here in the future
  ]

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/editor/${templateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Resume Template</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative bg-white shadow-sm rounded-t-lg overflow-hidden">
                <div className="w-full h-[600px] relative">
                  <div className="absolute inset-0 bg-white shadow-md m-4 rounded">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover rounded"
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t">
                <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                <p className="mt-2 text-gray-600">{template.description}</p>
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className="mt-4 w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 