### bytemd-plugin-align

一个bytemd的插件，复刻掘金的样式，给导航栏添加一个图标用于添加居中位置,点击icon进行切换！

![demo](https://file.mmmss.com/i/2024/09/03/417866.png)

#### Usage

```shell
pnpm install bytemd-plugin-align
import alignPlugin from "bytemd-plugin-align"

const plugins = [
  alignPlugin({
    cb: () => {} // 可添加事件回调
  })
]
```

