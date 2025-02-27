export type InspectMetadataFromImage = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  copyright?: string
  creator?: string
  license?: string
  keywords?: Array<string>
  artist?: string
  originalDate?: Date
  allDates?: Date
  creationDate?: Date
  title?: string
  description?: string
}
