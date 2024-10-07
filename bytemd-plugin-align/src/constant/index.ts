import type { MenuListItem } from "../types/types"
import icons from "./icons"

export const menuList: MenuListItem[] = [
  {
    title: '左对其',
    codeLeft: "<p align=left>",
    codeRight: "</p>",
    icon: icons.Left
  },
  {
    title: '居中对其',
    codeLeft: "<p align=center>",
    codeRight: "</p>",
    icon: icons.Center
  },
  {
    title: '右对其',
    codeLeft: "<p align=right>",
    codeRight: "</p>",
    icon: icons.Right
  }
]