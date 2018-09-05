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
查看[demo](!https://m.limuyi.com.cn)
