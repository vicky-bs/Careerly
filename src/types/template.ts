export interface TemplateSection {
  id: string
  title: string
  type: 'container' | 'section'
  width: string
  height: string
  style?: React.CSSProperties
  children?: TemplateSection[]
}

export interface TemplateStyle {
  primaryColor: string
  secondaryColor: string
  headingFont: string
  bodyFont: string
  sectionSpacing: number
  contentPadding: number
}

export interface TemplateJSON {
  layout: {
    containers: TemplateSection[]
  }
  sections: TemplateSection[]
  styles: TemplateStyle
  metadata?: {
    name: string
    description: string
    author?: string
    version?: string
    created?: string
    updated?: string
  }
}

export interface TemplateValidationError {
  path: string
  message: string
}