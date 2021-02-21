## 搭配环境

### 1. Node.js 安装：

下载链接：[https://nodejs.org/dist](https://nodejs.org/dist/)。

最好选择 `v14.15.1` 下载安装。

安装完成后，打开控制台，输入 `node -v `和 `npm -v `来测试是否安装好。

### 2. NVM 安装使用（选）

如果有多个 **node.js** 版本，可以使用 **nvm** 来控制版本。

下载链接：[https://github.com/coreybutler/nvm-windows/release](https://github.com/coreybutler/nvm-windows/releases)。

用命令如下：

```bash
nvm install 14.15.1  # 安装对应的版本
nvm use 14.15.1  # 引入使用对应的版本
nvm uninstall 14.13.0  # 卸载对应的版本
```

### 3. 安装依赖

更换安装源：`npm install -g cnpm --registry=https://registry.npm.taobao.org`

在项目文件夹内执行 `cnpm install`。‌

### 4. 启动项目

直接启动：`npm run dev`。（或者 `npm run prod`）。

### 5. 发布项目

```
npm run build:prod
```


