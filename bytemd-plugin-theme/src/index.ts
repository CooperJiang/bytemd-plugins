import icons from './icons'
import type { ThemeOptions, Locale, ThemeListItem } from './types/types';
import * as themeMap from "juejin-markdown-themes/dist"
import zh from './locales/zh_Hans.json'
import type { BytemdPlugin } from 'bytemd';

type ThemeKeys = keyof typeof themeMap; 

const themeNames = Object.keys(themeMap) as ThemeKeys[];
export const themeList: ThemeListItem[]  = Object.keys(themeMap).filter(key => key !== "default").map( key => ({
  title: key,
  style: themeMap[key]?.style,
  rewrite: "",
  theme: key,
  highlight: themeMap[key]?.highlight,
}))


export function setTheme(themeName: ThemeKeys){
  if(themeNames.includes(themeName)){
    const style = themeMap[themeName]?.style
    let markdownThemeStyleElement = document.querySelector('#markdownTheme')
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = style
    } else {
      markdownThemeStyleElement = document.createElement('style')
      markdownThemeStyleElement.id = 'markdownTheme'
      markdownThemeStyleElement.innerHTML = style
      document.head.appendChild(markdownThemeStyleElement)
    }
  }else{
    console.warn(`${themeName} not included in the built-in theme, Please call the setCustomStyle  method to pass in a custom style`)
  }
}

export function setCustomStyle(style: string){
  let markdownThemeStyleElement = document.querySelector('#markdownTheme')
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = style
  } else {
    markdownThemeStyleElement = document.createElement('style')
    markdownThemeStyleElement.id = 'markdownTheme'
    markdownThemeStyleElement.innerHTML = style
    document.head.appendChild(markdownThemeStyleElement)
  }
}

export async function changeTheme(theme: ThemeListItem | string): Promise<void> {
  let str = ""
  if(typeof theme === 'string') {
    str = theme
  }else{
    const {title, style } = theme;
    if(themeNames.includes(title)) {
      str = themeMap[title]?.style
    }else{
      str = style
    }
  }
 
  let markdownThemeStyleElement = document.querySelector('#markdownTheme')
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = str
  } else {
    markdownThemeStyleElement = document.createElement('style')
    markdownThemeStyleElement.id = 'markdownTheme'
    markdownThemeStyleElement.innerHTML = str
    document.head.appendChild(markdownThemeStyleElement)
  }
}

export default function theme(options?: ThemeOptions
): BytemdPlugin {
  const locale = { ...zh, ...options?.locale } as Locale
  const actionItems = options?.themeList || themeList;
  return {
    actions: [
      {
        title: locale.headerTitle,
        icon: icons.ToolBar,
        handler: {
          type: 'dropdown',
          actions: actionItems.map((item) => ({
            title: item?.title,
            handler: {
              type: 'action',
              click(ctx) {
                let style = item?.style
                if(item.rewrite) {
                  style = `${style} \n ${item.rewrite}`
                }
                changeTheme(item)
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
