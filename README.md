# Electron Vue Quick Start

## 说明

基于 Vue **3.0.0** 的构建的 Electron **^13.0.0** 快速开始脚手架。

支持包含：

- babel 转换
- typescript 支持
- jest 支持
- eslint 支持
- vue router/vuex
- sass 支持
- png|svg|jpg|jpeg|gif 引入支持
- git commit hooks, no 💩

## 环境

使用的 Node 的构建版本为 **v16.6.2**，为避免冲突，建议使用此版本。可以使用 **_nvm_** 管理 Node 版本。

依赖库版本：

- eslint: ^6.7.2
- sass: ^1.26.5
- typescript: ^4.1.5
- prettier: 2.4.1

## 目录

- `public`：静态资源文件夹，打包时原始复制资源（不包含 public）
- `test`：测试
- `src`：src, code here

## 使用

执行：`npm install`，然后：

- 启动 Electron 服务：`npm run electron:serve`
- 构建 App：`npm run electron:build`
- 构建 windows App：`npm run electron:build:windows`
- 构建 mac App：`npm run electron:build:mac`
- 单启动 renderer 服务：`npm run serve`
- 单构建 renderer：`npm run build`
- Lint 格式化/检查：`npm run eslint`
- 运行 jest 测试`npm run test:unit`

## 输出

- renderer 构建输出：`./dist`
- app 打包输出: `./build_electron`

## 参考

- [Configuration Reference](https://cli.vuejs.org/zh/config/).
- [Babel Config](https://babel.docschina.org/docs/en/7.0.0/configuration/)
- [EsLint](https://eslint.org/docs/user-guide/configuring/)
- [eslintignore-file](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file)
- [TSconfig](https://www.typescriptlang.org/tsconfig/)
- [npmrc](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc)
- [gitignore](https://git-scm.com/docs/gitignore)
- [webpack](https://webpack.docschina.org/guides/getting-started/)
- [prettier](https://prettier.io/docs/en/index.html)

## License

MIT License © 2021 [funnyzak](https://github.com/funnyzak)
