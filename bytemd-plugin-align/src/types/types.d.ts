export type Locale = {
  theme: string,
  headerTitle: string,
  alignText: string
}

export type MenuListItem = {
  title: string;
  codeLeft: string;
  codeRight: string;
  icon?: string;
}

export type AlignOptions = {
  locale?: Locale,
  cb?: (...args: any) => void
}