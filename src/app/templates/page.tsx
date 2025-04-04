'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TemplatesPage() {
  const router = useRouter()

  const templates = [
    {
      id: 'modern-navy',
      name: 'Modern Navy',
      description: 'Professional resume template with a navy blue header and clean typography. Perfect for executives and business professionals.',
      image: '/templates/modern-navy-preview.jpg'
    },
    {
      id: 'modern-teal',
      name: 'Modern Teal',
      description: 'Contemporary two-column layout with a teal sidebar. Ideal for technical and creative professionals.',
      image: '/templates/modern-teal-preview.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Resume Template</h1>
          <p className="mt-4 text-lg text-gray-600">Select a professional template to get started</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
            >
              <div className="aspect-[210/297] relative w-full max-w-[240px] mx-auto overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-contain transform transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{template.description}</p>
                <button
                  onClick={() => {
                    console.log('Template selected:', template.id)
                    router.push(`/editor/${template.id}`)
                  }}
                  className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
                    template.id === 'modern-navy'
                      ? 'bg-[#0A2647] hover:bg-[#0A3157]'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 