import { PhoneIcon, MapPinIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/outline'

export const ModernNavyTemplate = () => {
  return (
    <div className="min-h-[297mm] w-full">
      {/* Header Section */}
      <div className="bg-[#0A2647] text-white p-8">
        <div className="max-w-5xl mx-auto">
          {/* Name and Title */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold tracking-wide mb-1">{/* Name */}</h1>
            <h2 className="text-xl">{/* Title */}</h2>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <PhoneIcon className="w-4 h-4" />
              <span>{/* Phone */}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{/* Location */}</span>
            </div>
            <div className="flex items-center gap-1">
              <EnvelopeIcon className="w-4 h-4" />
              <span>{/* Email */}</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <span>{/* LinkedIn */}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-[2fr_1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Summary Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">SUMMARY</h3>
              <div className="text-gray-700">
                {/* Summary Content */}
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">EXPERIENCE</h3>
              <div className="space-y-4">
                {/* Experience Items */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{/* Role */}</h4>
                      <h5 className="text-[#0A2647]">{/* Company */}</h5>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{/* Date Range */}</div>
                      <div className="text-sm">{/* Location */}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{/* Brief Description */}</p>
                  <ul className="list-disc ml-4 text-gray-700 space-y-1">
                    {/* Achievement Points */}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Strengths Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">STRENGTHS</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{/* Strength Title */}</h4>
                  <p className="text-gray-700 text-sm">{/* Strength Description */}</p>
                </div>
              </div>
            </section>

            {/* Key Achievements Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">KEY ACHIEVEMENTS</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{/* Achievement Title */}</h4>
                  <p className="text-gray-700 text-sm">{/* Achievement Description */}</p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                {/* Skill Tags */}
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{/* Skill */}</span>
              </div>
            </section>

            {/* Interests Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">INTERESTS</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{/* Interest Title */}</h4>
                  <p className="text-gray-700 text-sm">{/* Interest Description */}</p>
                </div>
              </div>
            </section>

            {/* Courses Section */}
            <section>
              <h3 className="text-[#0A2647] text-lg font-semibold border-b border-gray-200 pb-1 mb-3">COURSES</h3>
              <div className="space-y-2">
                {/* Course Items */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 