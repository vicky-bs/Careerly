import { TemplateJSON, TemplateValidationError, TemplateSection } from '@/types/template'

const validateSection = (section: TemplateSection, path: string): TemplateValidationError[] => {
  const errors: TemplateValidationError[] = []

  if (!section.id) {
    errors.push({ path: `${path}.id`, message: 'Section ID is required' })
  }
  if (!section.title) {
    errors.push({ path: `${path}.title`, message: 'Section title is required' })
  }
  if (!section.type) {
    errors.push({ path: `${path}.type`, message: 'Section type is required' })
  }
  if (section.type !== 'container' && section.type !== 'section') {
    errors.push({ path: `${path}.type`, message: 'Section type must be either "container" or "section"' })
  }

  // Validate children recursively if this is a container
  if (section.type === 'container' && section.children) {
    section.children.forEach((child, index) => {
      errors.push(...validateSection(child, `${path}.children[${index}]`))
    })
  }

  return errors
}

export const validateTemplateJSON = (json: any): TemplateValidationError[] => {
  const errors: TemplateValidationError[] = []

  // Check if JSON has required top-level properties
  if (!json.layout) {
    errors.push({ path: 'layout', message: 'Template layout is required' })
  } else {
    if (!json.layout.columns || typeof json.layout.columns !== 'number') {
      errors.push({ path: 'layout.columns', message: 'Layout must specify the number of columns' })
    }
  }

  if (!json.styles && !json.colorPalette) {
    errors.push({ path: 'styles', message: 'Template styles or colorPalette is required' })
  } else {
    // Validate colorPalette if present
    if (json.colorPalette) {
      if (!json.colorPalette.primaryColor) {
        errors.push({ path: 'colorPalette.primaryColor', message: 'Primary color is required' })
      }
      if (!json.colorPalette.secondaryColor) {
        errors.push({ path: 'colorPalette.secondaryColor', message: 'Secondary color is required' })
      }
    }

    // Validate fontFamily and fontSize subfields
    if (json.styles?.fontFamily) {
      if (!json.styles.fontFamily.heading) {
        errors.push({ path: 'styles.fontFamily.heading', message: 'Heading font is required' })
      }
      if (!json.styles.fontFamily.body) {
        errors.push({ path: 'styles.fontFamily.body', message: 'Body font is required' })
      }
    }

    if (json.styles?.fontSize) {
      if (!json.styles.fontSize.name) {
        errors.push({ path: 'styles.fontSize.name', message: 'Font size for name is required' })
      }
      if (!json.styles.fontSize.sectionTitle) {
        errors.push({ path: 'styles.fontSize.sectionTitle', message: 'Font size for section titles is required' })
      }
      if (!json.styles.fontSize.heading) {
        errors.push({ path: 'styles.fontSize.heading', message: 'Font size for headings is required' })
      }
      if (!json.styles.fontSize.body) {
        errors.push({ path: 'styles.fontSize.body', message: 'Font size for body text is required' })
      }
    }
  }

  // Validate sections (optional)
  if (json.sections) {
    json.sections.forEach((section: any, index: number) => {
      if (!section.id) {
        errors.push({ path: `sections[${index}].id`, message: 'Section ID is required' })
      }
      if (!section.type) {
        errors.push({ path: `sections[${index}].type`, message: 'Section type is required' })
      } else if (section.type !== 'container' && section.type !== 'section') {
        errors.push({ path: `sections[${index}].type`, message: 'Section type must be either "container" or "section"' })
      }
    })
  }

  return errors
}

export const isValidTemplateJSON = (json: any): json is TemplateJSON => {
  return validateTemplateJSON(json).length === 0
}