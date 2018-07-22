# webpack4 for React

## what is webpack?
core: code bundler  代码打包用的

----

## why webpack exists? 为什么会出现 webpack 这种东西, 它解决了什么痛点
 It takes your code, transforms and bundles it, then returns a brand new version of your code.

webpack 前端在发展的过程中出现了很多提高效率的工具以及新的语法特性, 但是浏览器的滞后导致并不能识别这些代码或者新特性, webpack 就是为了把你的代码统一转化并且打包, 返回新的代码.

#### why new code?
it tries to take your code to compile with the browser could understand. such as ES6, less / SASS, coffeeJavascript, React, etc... it will transforms every code and output a bundle file.
`主要是为了转化为浏览器可以识别的代码, 类似于一个一套流程的集合, 比如利用 babel 来转化 ES6 和 React, 用 css-loader, sass-loader 来转化 sass 为 css, 或者用 postcss-loader 来使用 postcss 的功能等等, 然后统一打包并且返回一个新的浏览器兼容的代码`

## how webpack work?
three main things webpack want's to know :
1. webpack needs to know the starting point of your application, or your root JavaScript file. `entry`
2. webpack needs to know which transformations to make on your code. `module`
3. webpack needs to know to which location it should save the new transformed code. `output`

webpack 需要知道三件事, 从哪里来, 怎么转, 到哪里去, webpack 4 需要知道是什么用于什么环境 mode: development / build



#### treat each file as IIFE, 这样可以出现同样的变量

#### loader and rule

- test: regex
- use: array, string, function
- include: regexp [],
- exclude: regexp [],
- issuer: regexp | string
- enforce: 'pre' | 'post'

```js
module: {
    rules: [
        {test: /\.js$/, use:'babel-loader'},
        {test: /\.css$/, use:'css-loader'},
    ]
}
```

#### plugins

a plugin is object which implement an apply function
complier use it to emit events

- require() plugin from node_modules into config
- add new instance of plugin to plugin s key in config object
- provide addtional infomation for arguments

multipage-webpack-plugin
webpack.ProgressPlugin()
webpack-merge
min-css-extract-plugin --- change style loader to this plugin
