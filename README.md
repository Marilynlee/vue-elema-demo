# vue-sell-demo

> 使用vue-cli构建项目，实现饿了吗app页面.

## 运行命令

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目概况

- 使用vue-cli构建项目
- 使用vue-router控制路由
- 使用vue-resource发送请求
- 使用eslint校验代码风格
- 使用stylus书写样式
- 使用es6书写js
- 使用webpack打包编译
- 数据采用本地mock，文件为data.json

## 采坑记录
1. vue-cli新版本配置mock数据需要在webpack.dev.conf.js中配置
2. vue2.x版本中已经去掉ready生命周期
3. vue2.x版本中子组件获取dom使用ref绑定，$refs获取
4. vue2.x版本中父子组件通信，使用$emit进行事件派发
5. vue2.x版本中transition是在组件外部包裹transition标签
6. vue2.x版本中子组件不可改变props属性，计算属性可以设置set、get方法
7. stylus中import使用alias路径，需要在路径前面加~
8. 还有一些坑，项目过程中忘记了，反正是一路踩过来，改过来！

## 项目预览
查看[demo](https://m.limuyi.com.cn)

## 项目发布
1. 采用vue-cli 自动构建的vue项目，如果静态文件不是部署在网站根目录下，需要修改项目配置为相对路径，主要需要做两步。
  - 修改config => index.js => build => assetsPublicPath 中的'/'成为'./'
  - 在build => util.js 里找到ExtractTextPlugin.extract增加一行：publicPath: '../../'
2. 采用vue-cli 自动构建的vue项目，选择了router,打开的默认地址后有/#，可以实例化Router时：设置mode属性为：history
```
new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'xx',
      component: xx
    }
  ]
})
```
3. 发布时去掉项目中的日志和断点，在build/webpack.prod.conf.js中UglifyJsPlugin插件下配置
```
new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,     //去掉断点
          drop_console: true       //去掉日志
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
```
4. 由于本项目采用的是本地mock数据，所以npm run build之前需要将请求接口均修改为线上接口
