### bytemd-plugin-copy-code

一个bytemd的插件，用于给代码片段添加复制按钮用于赋值

![demo](https://file.mmmss.com/i/2024/09/05/396831.png)

#### Usage

```shell
import copyCode from "bytemd-plugin-copy-code"
import "bytemd-plugin-copy-code/dist/style/index.css"

const plugins = [
  copyCode({
    copySuccess: text => { console.log("复制成功") },
    copyError: err => {},
    copyRight: "追加版权信息",
    //...
  })
]
```

