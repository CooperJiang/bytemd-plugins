export type Locale = {
  theme: string,
  headerTitle: string,
}

export type ThemeListItem = {
  title: string;
  style: string;
  rewrite?: string;
  theme?: string;
  highlight?: string
}

export type ThemeOptions = {
  locale?: Locale,
  themeList?: ThemeListItem[]
  cb?: (...args: any) => void
}


declare module 'juejin-markdown-themes/dist/*' {
  const content: any;
  export default content;
}