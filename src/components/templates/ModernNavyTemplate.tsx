'use client'

import { PhoneIcon, GlobeAltIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

// Added layout metadata to define the template structure
export const ModernNavyTemplateLayout = {
  columns: 1,
  boundaries: [
    { column: 1, sections: ['Executive Summary', 'Professional Experience', 'Education', 'Core Competencies', 'Key Achievements', 'Certifications'] },
  ],
}

interface Section {
  id: string;
  title: string;
  type: string;
  column: number;
  page: number;
  data?: any;
  isLocked?: boolean;
}

interface ModernNavyTemplateProps {
  sections: Section[];
}

// Section rendering components
const ExperienceSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-navy-800">{data.jobTitle}</h3>
          <p className="text-navy-700 font-medium">{data.company}</p>
        </div>
        <div className="text-sm text-navy-600">
          <span>{data.startDate}</span>
          {data.endDate && <> - {data.endDate}</>}
          <span className="mx-2">•</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mt-2 text-navy-600" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>
  );
};

const EducationSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-navy-800">{data.degree}</h3>
          <p className="text-navy-700 font-medium">{data.institution}</p>
        </div>
        <div className="text-sm text-navy-600">
          <span>{data.graduationDate}</span>
          <span className="mx-2">•</span>
          <span>{data.location}</span>
        </div>
      </div>
      {data.description && (
        <div className="mt-2 text-navy-600" dangerouslySetInnerHTML={{ __html: data.description }} />
      )}
    </div>
  );
};

const SkillsSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-navy-800 mb-2">{data.category || 'Skills'}</h3>
      <div className="grid grid-cols-2 gap-6 text-navy-600">
        {data.skills?.split(',').map((skill: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <span>{skill.trim()}</span>
          </div>
        )) || null}
      </div>
    </div>
  );
};

const LanguagesSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-navy-700 font-medium">{data.language}</span>
        <span className="text-sm text-navy-600">{data.proficiency}</span>
      </div>
    </div>
  );
};

const ProjectsSection = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-navy-800">{data.projectName}</h3>
          <p className="text-navy-700 font-medium">{data.role}</p>
        </div>
        <div className="text-sm text-navy-600">
          <span>{data.startDate}</span>
          {data.endDate && <> - {data.endDate}</>}
        </div>
      </div>
      <p className="text-sm text-navy-600 mt-1">Technologies: {data.technologies}</p>
      <div className="mt-2 text-navy-600" dangerouslySetInnerHTML={{ __html: data.description }} />
    </div>
  );
};

const renderSection = (section: Section) => {
  switch (section.type) {
    case 'experience':
      return <ExperienceSection data={section.data} />;
    case 'education':
      return <EducationSection data={section.data} />;
    case 'skills':
      return <SkillsSection data={section.data} />;
    case 'languages':
      return <LanguagesSection data={section.data} />;
    case 'projects':
      return <ProjectsSection data={section.data} />;
    default:
      return null;
  }
};

export default function ModernNavyTemplate({ sections }: ModernNavyTemplateProps) {
  return (
    <div className="bg-white w-full h-full">
      {/* Header Section */}
      <div className="bg-navy-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 tracking-tight">YOUR NAME</h1>
          <h2 className="text-2xl font-medium text-navy-100">Senior Executive</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-navy-100">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <span>Phone number</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4" />
              <span>Email address</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="h-4 w-4" />
              <span>LinkedIn URL</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map(section => (
            <section key={section.id}>
              <h2 className="text-xl font-semibold mb-4 text-navy-800 border-b-2 border-navy-200 pb-2">
                {section.title.toUpperCase()}
              </h2>
              {renderSection(section)}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}