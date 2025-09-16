export interface StyleGuide {
  colors: {
    background: string
    cardBackground: string
    primaryText: string
    accentColor: string
    borderColor: string
  }
  fonts: {
    primary: string
    weight: {
      normal: string
      bold: string
    }
  }
  spacing: {
    small: string
    medium: string
    large: string
    xlarge: string
  }
  effects: {
    shadow: string
    border: string
  }
}

export interface SlideContent {
  type: 'title' | 'content' | 'end'
  title: string
  subtitle?: string
  points?: string[]
  footer?: string
}

export interface PostTakeaways {
  title: string
  slug: string
  slides: SlideContent[]
}

export interface SlideGenerationOptions {
  postSlug: string
  outputDir: string
  generatePDF: boolean
}