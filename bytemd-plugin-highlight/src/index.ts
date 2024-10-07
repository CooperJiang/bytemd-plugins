import icons from './icons'
import type { HighlightOptions, Locale, HighlightListItem } from './types/types';
import zh from './locales/zh_Hans.json'
import type { BytemdPlugin } from 'bytemd';
import highlightMap from "./constant/index"

type ThemeKeys = keyof typeof highlightMap; 

const themeNames = Object.keys(highlightMap) as ThemeKeys[];
const highlightList = themeNames.map(key => ({
  title: key,
  style: highlightMap[key],
}));

export { highlightList };

export function setTheme(themeName: ThemeKeys){
  if(themeNames.includes((themeName as ThemeKeys))){
    const style = highlightMap[themeName]
    let markdownThemeStyleElement = document.querySelector('#highlightStyle')
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = style
    } else {
      markdownThemeStyleElement = document.createElement('style')
      markdownThemeStyleElement.id = 'highlightStyle'
      markdownThemeStyleElement.innerHTML = style
      document.head.appendChild(markdownThemeStyleElement)
    }
  }else{
    console.warn(`${themeName} not included in the built-in theme, Please call the setCustoms Style method to pass in a custom style`)
  }
}

export function setCustomStyle(style: string){
  let markdownThemeStyleElement = document.querySelector('#highlightStyle')
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = style
  }  else {
    markdownThemeStyleElement = document.createElement('style')
    markdownThemeStyleElement.id = 'highlightStyle'
    markdownThemeStyleElement.innerHTML = style
    document.head.appendChild(markdownThemeStyleElement)
  }

}

export async function changeHighLight(highlightItem: HighlightListItem | string): Promise<void> {
  let str = ""
  if(typeof highlightItem === 'string') {
    str = highlightItem
  }else{
    const { style, title } = highlightItem
    if(themeNames.includes((title as ThemeKeys))) {
      str = highlightMap[(title as ThemeKeys)]  || ""
    }else{
      str = style || ""
    }
  }
  let markdownThemeStyleElement = document.querySelector('#highlightStyle')
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = str
  } else {
    markdownThemeStyleElement = document.createElement('style')
    markdownThemeStyleElement.id = 'highlightStyle'
    markdownThemeStyleElement.innerHTML = str
    document.head.appendChild(markdownThemeStyleElement)
  }
}


export default function theme(options?: HighlightOptions
): BytemdPlugin {
  const locale = { ...zh, ...options?.locale } as Locale
  const actionItems = options?.highLightList || highlightList;
  return {
    actions: [
      {
        title: locale.headerTitle,
        icon: icons.ToolBar,
        handler: {
          type: 'dropdown',
          actions: actionItems.map((item: HighlightListItem) => ({
            title: item?.title,
            handler: {
              type: 'action',
              click(ctx) {
                let style = item?.style
                if(!style){
                  return console.error(`${item?.title} miss style`)
                }
                if(item?.rewrite) {
                  style = `${style}${item?.rewrite}`
                }
                changeHighLight(item)
                options?.cb?.(item)
              },
            },
          })),
          ...locale,  
        }
      }
    ]
  }
}

