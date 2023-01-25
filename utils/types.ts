export interface cip0025MetadataType {
  name: string
  image: string | Array<string>
  mediaType: string
  files: Array<{
    name: string
    mediaType: string
    src: string | Array<string>
  }>
}
