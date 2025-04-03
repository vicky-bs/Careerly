'use client'

import {
  PlusIcon,
  ArrowsUpDownIcon,
  DocumentDuplicateIcon,
  SunIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline'

const sidebarItems = [
  { icon: PlusIcon, label: 'Add section' },
  { icon: ArrowsUpDownIcon, label: 'Rearrange' },
  { icon: DocumentDuplicateIcon, label: 'Templates' },
  { icon: SunIcon, label: 'Design & Font' },
  { icon: PencilSquareIcon, label: 'Improve it', badge: '10' },
  { icon: CheckCircleIcon, label: 'Check' },
  { icon: SparklesIcon, label: 'AI Assistant' },
  { icon: ArrowDownTrayIcon, label: 'Download' },
  { icon: ShareIcon, label: 'Share' },
  { icon: ClockIcon, label: 'History' },
  { icon: TagIcon, label: 'Branding', toggle: true }
]

export function Sidebar() {
  return (
    <div className="w-[180px] bg-white border-r border-gray-200">
      <nav className="py-4">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md">
                {item.badge}
              </span>
            )}
            {item.toggle && (
              <div className="w-8 h-4 bg-emerald-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
} 