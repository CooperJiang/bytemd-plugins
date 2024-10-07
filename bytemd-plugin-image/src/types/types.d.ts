export type Locale = {
  theme: string,
  headerTitle: string,
  alignText: string
}

export type MenuListItem = {
  title: string;
  codeLeft: string;
  codeRight: string;
}

export type ImageOptions = {
  locale?: Locale,
  cb?: (...args: any) => void
}