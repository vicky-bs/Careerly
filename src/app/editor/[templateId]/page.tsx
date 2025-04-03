'use client'

import { ModernTealTemplate } from '@/components/templates/ModernTealTemplate'
import { useParams } from 'next/navigation'
import { PlusIcon, ArrowsUpDownIcon, SwatchIcon, PaintBrushIcon, SparklesIcon, DocumentCheckIcon, ClockIcon, ShareIcon, TagIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

// Theme configurations for different templates
const themeColors = {
  'modern-teal': {
    primary: 'teal',
    colors: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      hover: 'hover:bg-teal-50',
      icon: 'text-teal-600',
      badge: 'bg-teal-100',
      badgeText: 'text-teal-700',
      gradient: 'from-teal-50 to-emerald-50'
    }
  },
  // Add more template themes here as needed
  'default': {
    primary: 'blue',
    colors: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-50',
      icon: 'text-blue-600',
      badge: 'bg-blue-100',
      badgeText: 'text-blue-700',
      gradient: 'from-blue-50 to-indigo-50'
    }
  }
}

export default function EditorPage() {
  const params = useParams()
  const templateId = params.templateId as string
  const [scale, setScale] = useState(1)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  // Get theme colors based on template
  const theme = themeColors[templateId as keyof typeof themeColors] || themeColors.default

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }

  const sidebarItems = [
    { icon: PlusIcon, label: 'Add section', badge: null },
    { icon: ArrowsUpDownIcon, label: 'Rearrange', badge: null },
    { icon: SwatchIcon, label: 'Templates', badge: null },
    { icon: PaintBrushIcon, label: 'Design & Font', badge: null },
    { icon: SparklesIcon, label: 'Improve it', badge: '10' },
    { icon: DocumentCheckIcon, label: 'Check', badge: null },
    { icon: SparklesIcon, label: 'AI Assistant', badge: null },
    { icon: ClockIcon, label: 'Download', badge: null },
    { icon: ShareIcon, label: 'Share', badge: null },
    { icon: ClockIcon, label: 'History', badge: null },
    { icon: TagIcon, label: 'Branding', badge: null },
  ]

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern-teal':
        return <ModernTealTemplate />
      default:
        return <div>Template not found</div>
    }
  }

  return (
    <div className="flex h-screen bg-[#f0f2f5]">
      {/* Left Sidebar - Floating */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-white/95 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 backdrop-blur-sm backdrop-filter">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <button
                  className={`flex items-center w-full p-2.5 text-sm rounded-xl transition-all duration-200 ${
                    activeItem === index
                      ? `${theme.colors.bg} ${theme.colors.text}`
                      : `text-gray-700 hover:bg-gray-50/80`
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    activeItem === index ? theme.colors.icon : 'text-gray-600'
                  }`} />
                  <span className={`ml-3 font-medium min-w-[120px] transition-all duration-200 ${
                    activeItem === index 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                      activeItem === index
                        ? `${theme.colors.badge} ${theme.colors.badgeText}`
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
                {/* Hover card effect */}
                <div className={`absolute left-0 right-0 -inset-1 rounded-xl transition-all duration-200 ${
                  activeItem === index
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.colors.gradient} opacity-50 blur`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable with A4 styling */}
      <main className="flex-1 overflow-auto ml-[100px] p-8 bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Zoom Controls */}
        <div className="fixed right-8 top-8 flex items-center space-x-2 bg-white rounded-lg shadow-md p-2 z-50">
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
            title="Zoom Out"
          >
            <MagnifyingGlassMinusIcon className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
            title="Zoom In"
          >
            <MagnifyingGlassPlusIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="max-w-[210mm] mx-auto" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
          {/* A4 Page Container */}
          <div className="bg-white rounded-sm relative transform transition-transform duration-200 hover:translate-y-[-2px]">
            {/* Paper effect layers */}
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-gray-50 to-white"></div>
            <div className="absolute inset-0 rounded-sm shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>
            <div className="absolute inset-0 rounded-sm shadow-[2px_4px_12px_rgba(0,0,0,0.08)]"></div>
            <div className="absolute inset-0 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
            {/* Subtle edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
            
            {/* A4 Content */}
            <div className="w-[210mm] min-h-[297mm] relative bg-white rounded-sm z-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
              {renderTemplate()}
            </div>

            {/* Paper stack effect */}
            <div className="absolute -bottom-1 -right-1 left-1 h-[297mm] bg-white rounded-sm -z-10 opacity-40 shadow-sm"></div>
            <div className="absolute -bottom-2 -right-2 left-2 h-[297mm] bg-white rounded-sm -z-20 opacity-20 shadow-sm"></div>
          </div>
          {/* Page gap with enhanced shadow */}
          <div className="h-16"></div>
        </div>
      </main>
    </div>
  )
} 