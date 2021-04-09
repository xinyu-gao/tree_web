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

#### Windows

下载 nginx（任意版本）

修改 nginx 配置文件（conf/nginx.conf）：

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
修改监听的端口号（listen）， 以及 `/api/` 的代理地址（proxy_pass）。

将打包好的文件（dist下的三个文件）放到 nginx\web 目录下即可。

#### Ubuntu 18.0^：

下载（下载完后自动启动）：

```bash
sudo apt install nginx
```

修改配置，文件位置在 `/etc/nginx/nginx.conf`

```bash
sudo vim /etc/nginx/nginx.conf
```

vim 操作不赘诉

如果是图形化界面用 Text Editor 打开修改的话，或者使用 xftp 编辑文件，

需要给权限，执行命令：

```bash
sudo chmod 777 nginx.conf
```

```conf
server {
    listen       9520;
    location / {
        root /home/ubuntu/web;
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

注意：

- 修改监听的端口号（listen）。

- root 的地址改为自己想要放置的目录下。

- `/api/` 的代理地址（proxy_pass）。







把 dist 目录下文件放到 **用户目录下**（这里是 `/home/ubuntu`）的 web 目录下。

重新加载配置文件：

```bash
sudo nginx -s reload
```

不需要重启等命令