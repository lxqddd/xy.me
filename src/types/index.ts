export type Tag =
  | 'Essay'
  | 'Electron'
  | 'JavaScript'
  | 'Tools'
  | 'Finance'
  | 'Algorithm'
  | 'VueSeries'
  | 'Css'
  | 'Typescript'
  | 'CI/CD'
  | 'All'

export interface IBlogFrontmatter {
  title: string
  author: string
  pubDate: Date
  tag: Tag
  layout: string
  draft?: boolean
}

export interface IBlog {
  file: string
  frontmatter: IBlogFrontmatter
  url: string
}

export interface ITag {
  tagName: Tag
  num: number
}