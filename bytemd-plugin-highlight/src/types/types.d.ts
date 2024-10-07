export type Locale = {
  theme: string,
  headerTitle: string,
}

export type HighlightListItem = {
  title: string;
  style?: string;
  rewrite?: string;
}

export type HighlightOptions = {
  locale?: Locale,
  highLightList?: HighlightListItem[]
  cb?: (...args: any) => void
}