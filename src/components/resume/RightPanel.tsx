'use client'

import {
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

export function RightPanel() {
  return (
    <div className="p-6 space-y-8">
      {/* Strengths Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-white">STRENGTHS</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <SparklesIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Leadership</h3>
            </div>
            <p className="text-sm text-gray-300">
              Strong leadership skills and ability to motivate teams towards common goals
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Decision Making</h3>
            </div>
            <p className="text-sm text-gray-300">
              Adaptive decision-making skills in high-pressure environments
            </p>
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-white">KEY ACHIEVEMENTS</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <BoltIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Automation and Operational Efficiency</h3>
            </div>
            <p className="text-sm text-gray-300">
              Successfully implemented automation initiatives resulting in significant operational savings and efficiency improvements
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <HeartIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Revenue Generation</h3>
            </div>
            <p className="text-sm text-gray-300">
              Achieved substantial revenue generation through strategic management of major accounts
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-white">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {['Agile', 'Docker', 'IBM', 'IELTS', 'Kaizen', 'PMO', 'Python', 'RFP', 'Scrum', 'Gmail'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Interests Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-white">INTERESTS</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Technology Enthusiast</h3>
            </div>
            <p className="text-sm text-gray-300">
              Passionate about technology and its integration to enhance business processes
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Social Networking</h3>
            </div>
            <p className="text-sm text-gray-300">
              Enjoys social activities and networking to build professional relationships
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 