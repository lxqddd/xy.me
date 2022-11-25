export type Tag =
  | 'Essay'
  | 'Electron'
  | 'JavaScript'
  | 'tools'
  | 'Algorithm'
  | 'VueSeries'
  | 'Css'
  | 'Typescript'
  | 'All'

export interface IBlogFrontmatter {
  title: string
  author: string
  date: Date
  tag: Tag
  layout: string
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