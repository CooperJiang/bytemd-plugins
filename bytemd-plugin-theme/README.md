### bytemd-plugin-theme

一个bytemd的插件，复刻掘金的样式，给导航栏添加一个图标用于切换主题，可以添加一个icon进行切换主题，默认自带了掘金的全部主题，引用了juejin-markdown-themes，可以使用其中所有主题，也可以自定义扩展或者删减主题。

![demo](https://file.mmmss.com/i/2024/09/01/914257.jpg)

#### Usage

```shell
pnpm install bytemd-plugin-theme
```

```javascript
import theme from "bytemd-plugin-theme"
import { setTheme, themeList, setCustomStyle } from "bytemd-plugin-theme"

const plugins = [
  theme()
]
```

可以调用 setCustomStyle 手动传入 style str 进行更换样式，也可以通过themeList查看所有可以使用的主题

如果你想自定义主题或者删减主题，那么你可以导出自带默认的主题，并且删减后按照原格式传回去即可

```vue
import { themeList } from "bytemd-plugin-theme"
import theme from "bytemd-plugin-theme"

const customList = themeList  // 自定义删减或者新增自定义的主题

  theme({
    themeList: customList
    cb: changeThemeCb  // 可以传入一个回调函数，当主题切换的时候会通知回来  不分主题同时自带了highlight样式也会一起返回
  })
]
```

在Viewer使用的时候，可以通过主题手动设置，下面是一个vue3 Demo。

```vue
<template>
  <div class="h-full w-full">
    <Viewer id="v-Editor" :plugins="plugins" :value="code" class="editor" />
  </div>
</template>

<script lang="ts" setup>
import { Viewer } from "@bytemd/vue-next"
import themePlugin from "bytemd-plugin-theme"
import { setTheme } from "bytemd-plugin-theme"

interface Props {
  code: string
  theme: string
}
const props = defineProps<Props>()

const plugins = [
  themePlugin({
    cb: val => {
      console.log("themePlugin change cb: ", val)
    }
  })
]

watch(
  () => props.theme,
  (val: any) => {
    nextTick(() => val && setTheme(val))
  },
  { immediate: true }
)
</script>

```

#### Options

| 属性名    | 说明                   | 类型            | 默认                          |
| --------- | ---------------------- | --------------- | ----------------------------- |
| locale    | 自定义语言             | Locale          | Zh_cn                         |
| themeList | 可供选择的主题数量     | ThemeListItem[] | juejin-markdown-themes/dist/* |
| cb        | 切换主题时候触发的回调 | (theme) => {}   | -                             |

#### Event

| 事件名      | 说明             | 类型                         |      |
| ----------- | ---------------- | ---------------------------- | ---- |
| setTheme    | 手动设置主题     | (theme: string) => {}        |      |
| setCustomStyle  | 手动修改样式     | (styleStr: string) => {}     |      |
| changeTheme | 修改内置主题主题 | (theme: ThemeListItem) => {} |      |