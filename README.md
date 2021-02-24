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


### 6. 部署

ngnix 配置文件：

```conf
server {
    listen       9520;
    location / {
        root web;
        autoindex on;
        autoindex_exact_size on;
        autoindex_localtime on;
    }
    add_header Access-Control-Allow-Origin "*";
    default_type 'text/html';
    charset utf-8;
    location /api/ {
      proxy_pass http://127.0.0.1:2399/;
    }
}
```
修改监听的端口号， 以及 `/api/` 的代理地址。

将打包好的目录放到 nignx 的 web 目录下即可。