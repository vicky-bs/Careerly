'use client'

import { TemplateSection, TemplateStyle } from '@/types/template'

interface PreviewProps {
  sections: TemplateSection[]
  styles: TemplateStyle
}

export function Preview({ sections, styles }: PreviewProps) {
  return (
    <div 
      className="min-h-[297mm] w-[210mm] bg-white shadow-xl mx-auto"
      style={{
        '--primary-color': styles.primaryColor,
        '--secondary-color': styles.secondaryColor,
        '--section-spacing': `${styles.sectionSpacing * 0.25}rem`,
        '--content-padding': `${styles.contentPadding * 0.25}rem`,
        fontFamily: styles.bodyFont
      } as React.CSSProperties}
    >
      <div className="p-8 space-y-6">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="preview-section"
            style={{
              marginBottom: 'var(--section-spacing)',
              padding: 'var(--content-padding)'
            }}
          >
            <h2 
              className="text-xl font-semibold mb-4"
              style={{
                color: 'var(--primary-color)',
                fontFamily: styles.headingFont
              }}
            >
              {section.title}
            </h2>
            {section.type === 'container' && section.children && (
              <div className="space-y-4">
                {section.children.map((child) => (
                  <div 
                    key={child.id}
                    className="preview-section-content"
                    style={{
                      color: 'var(--secondary-color)'
                    }}
                  >
                    <h3 
                      className="text-lg font-medium mb-2"
                      style={{
                        fontFamily: styles.headingFont
                      }}
                    >
                      {child.title}
                    </h3>
                    {/* Placeholder content */}
                    <div className="h-16 bg-gray-50 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            )}
            {section.type === 'section' && (
              <div 
                className="preview-section-content"
                style={{
                  color: 'var(--secondary-color)'
                }}
              >
                {/* Placeholder content */}
                <div className="h-24 bg-gray-50 rounded-md animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}