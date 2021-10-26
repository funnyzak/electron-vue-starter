const path = require('path');
const fs = require('fs');
const processArgs = require('minimist')(process.argv.slice(2));

const resolve = (dir) => path.resolve(__dirname, dir);

// 入口页面基础配置
const pageBaseConfig = {
  root: resolve('src/pages'),
  entry: 'main.ts',
  template: 'public/index.html',
  filename: 'index.html'
};

// https://www.npmjs.com/package/git-revision-webpack-plugin
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  branch: true
});

const package = require('./package.json');

const gitInfo = {
  VERSION: gitRevisionPlugin.version(),
  COMMITHASH: gitRevisionPlugin.commithash(),
  BRANCH: gitRevisionPlugin.branch()
};

// 模板参数，应用 template html
// 可在html 使用如： <%=webpackConfig.externals.gitInfo.BRANCH%>
const templateParameters = {
  nowTimeString: new Date().toISOString(),
  // package.json信息
  package,
  // 进程信息
  process: {
    env: process.env
  },
  // git信息
  gitInfo
};

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  // 使用相对路径
  publicPath: '',
  // 将 lint 错误输出为编译警告
  lintOnSave: 'warning',
  // 输出文件夹
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 文件名hash
  filenameHashing: true,
  // 生产环境不生成sourcemap
  productionSourceMap: false,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // crossorigin: 'anonymous',
  devServer: {
    host: '0.0.0.0',
    port: '2085',
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理设置
    proxy: {
      // detail:https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      '/api': {
        target: 'https://request.worktile.com/6n6gHbBDL',
        changeOrigin: true,
        pathRewrite: {
          '^/api/1': '/api/3', // rewrite path
          '^/api/remove/path': '/path' // remove base path
        }
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "github.funnyzak.electron",
        "productName": "electron app",
        "copyright": "copyright © 2021 eric",
        "directories": {
          "output": "./dist_electron",
        },
        "asar": true,
        "dmg": {
          "contents": [{
            "x": 410,
            "y": 150,
            "type": "link",
            "path": "/Applications"
          },
          {
            "x": 130,
            "y": 150,
            "type": "file"
          }
          ]
        },
        "nsis": {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "installerIcon": "./public/icon/128x128.ico", // 安装图标
          "uninstallerIcon": "./public/icon/128x128.ico", //卸载图标
          "installerHeaderIcon": "./public/icon/128x128.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true, // 创建开始菜单图标
          "shortcutName": "demo", // 图标名称
        },
        "win": { //win相关配置
          "icon": "./public/icon/128x128.ico", //图标，当前图标在根目录下，注意这里有两个坑
          "target": [{
            "target": "nsis", //利用nsis制作安装程序
            "arch": [
              "x64", //64位
              "ia32" //32位
            ]
          }]
        },
        "mac": {
          "icon": './public/icon/128x128.icns'
        }
      }
    }
  },
  // webpack 配置
  configureWebpack: (config) => {
    // config.resolve.alias['@'] = 'src'

    // 注入变量
    config.externals = { ...config.externals, ...templateParameters };

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      config.plugins.push(gitRevisionPlugin);
    }
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  // https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => options);
  },
  // css 配置
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
