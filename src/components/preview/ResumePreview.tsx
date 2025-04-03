'use client'

export function ResumePreview() {
  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Download PDF
          </button>
          <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Share
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[21cm] mx-auto bg-white shadow-lg p-8 min-h-[29.7cm]">
          {/* Resume Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
            <p className="text-lg text-gray-600">Software Engineer</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>john.doe@example.com • (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-gray-700">
              Experienced software engineer with a proven track record in developing scalable web applications
              and leading technical teams. Passionate about creating efficient solutions and mentoring junior developers.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Senior Software Engineer</h3>
                <p className="text-gray-600">Tech Corp • 2020 - Present</p>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                  <li>Led development of microservices architecture</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Education</h2>
            <div>
              <h3 className="text-lg font-medium text-gray-900">BS in Computer Science</h3>
              <p className="text-gray-600">University of Technology • 2016 - 2020</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 