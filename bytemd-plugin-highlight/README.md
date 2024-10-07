### bytemd-plugin-highlight

一个bytemd的插件，复刻掘金的样式，给导航栏添加一个图标用于切换代码风格，可以添加一个icon进行切换主题，默认自带了掘金的全部代码风格主题，可以使用其中所有主题，也可以自定义扩展或者删减主题。

![demo](https://file.mmmss.com/i/2024/09/03/118538.png)

#### Usage

```shell
pnpm install bytemd-plugin-highlight
```

```shell
import highLightPlugin from "bytemd-plugin-highlight"

const plugins = [
  highLightPlugin()
]
```

可以调用 setTheme 手动传入 style str 进行更换样式，也可以通过highlightList查看所有可以使用的主题

如果你想自定义主题或者删减主题，那么你可以导出自带默认的主题，并且删减后按照原格式传回去即可

```javascript
import { highlightList } from "bytemd-plugin-highlight"
import highLightPlugin from "bytemd-plugin-highlight"

const customList = highlightList  // 自定义删减或者新增自定义的主题

  highLightPlugin({
    highlightList: customList
    cb: changeHighLightCb  // 可以传入一个回调函数，当主题切换的时候会通知回来
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
import highlightPlugin from "bytemd-plugin-highlight"
import { setTheme } from "bytemd-plugin-highlight"

interface Props {
  code: string
  highlight: string
}
const props = defineProps<Props>()

const plugins = [
highlightPlugin({
    cb: val => {
      console.log("highlightPlugin change cb: ", val)
    }
  })
]

watch(
  () => props.highlight,
  (val: any) => {
    nextTick(() => val && setTheme(val))
  },
  { immediate: true }
)
</script>

```

#### Options

| 属性名        | 说明                   | 类型                | 默认             |
| ------------- | ---------------------- | ------------------- | ---------------- |
| locale        | 自定义语言             | Locale              | Zh_cn            |
| highLightList | 可供选择的主题数量     | HighlightListItem[] | juejin自带的全部 |
| cb            | 切换主题时候触发的回调 | (theme) => {}       | -                |

#### Event

| 事件名         | 说明             | 类型                         |      |
| -------------- | ---------------- | ---------------------------- | ---- |
| setTheme       | 手动设置主题     | (theme: string) => {}        |      |
| setCustomStyle | 手动修改样式     | (Stylestr: string) => {}     |      |
| changeTheme    | 修改内置主题主题 | (theme: highlightItem) => {} |      |
