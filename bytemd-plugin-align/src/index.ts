import icons from './constant/icons'
import zh from './locales/zh_Hans.json'
import { menuList } from './constant/index'
import type { BytemdPlugin } from 'bytemd';
import type { Locale, MenuListItem, AlignOptions  } from './types/types';


export default function alignPlugin(options?: AlignOptions
): BytemdPlugin {
  const locale = { ...zh, ...options?.locale } as Locale
  return {
    actions: 
    [
      {
        icon: icons.ToolBar,
        handler: {
          type: 'dropdown',
          actions: menuList.map((item: MenuListItem ) => ({
            title: item?.title,
            icon: item.icon,
            handler: {
              type: 'action',
              click({ wrapText, editor }) {
                wrapText(item.codeLeft, item.codeRight)
                editor.focus()
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

