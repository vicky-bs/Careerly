'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export function Header() {
  return (
    <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center space-x-6">
        <div className="text-primary-600 font-bold text-2xl">
          <Image src="/logo.svg" alt="Careerly" width={32} height={32} />
        </div>
        <nav className="flex items-center space-x-4">
          <div className="flex items-center">
            <button className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium flex items-center">
              Create New
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium">
            Documents
          </button>
          <div className="flex items-center">
            <button className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium flex items-center">
              Jobs
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <button className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium">
            Resume Examples
          </button>
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">New Resume (2)</span>
          <span className="text-sm text-gray-400">(Saved)</span>
        </div>
        <button className="bg-emerald-500 text-white px-4 py-1 text-sm font-medium rounded-md hover:bg-emerald-600">
          Upgrade
        </button>
        <button className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
          VS
        </button>
      </div>
    </header>
  )
} 