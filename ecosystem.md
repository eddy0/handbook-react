# React Ecosystem

## Feature
- composition 组件化
    - everything is about component 一切皆组件
    - component are analogous to a container that wrap a bunch of functinality 组件类似于一个装了许多功能的容易, 类似于函数
    - Components can be used to compose other components   组件可以变成其他组件的组成部分, 类似于函数内部使用另一个函数
    - Well defined components can be used between different projects 设计好的组件可以在不同的项目中使用
- Declarative 声明式
    - Declarative program abstacts the implementation flow handled by imperative program. 声明式类似调用 API(写 what), 被动式是写具体实现过程 (写 how )
    - while writing a declarative solution one focusses on the WHAT rather than the HOW of the problem and uses the api that abstracts the how to do so. 思考写 what, 调用 api, 比如 for 循环 v.s. map, filter...
- Unidirectional Dataflow  单向数据流
    - state stores in component state 保存在组件里面    
    - data flow form the state to DOM 数据流从 state 向 DOM
    - parent pass data to children components with props 父组件通过 props 流向子组件
- Explicit Mutations 显示改变数据
    - Changing the state has to be done explicitly 改变 state 必须要显示
    - change the state of the component with this.setState render it to the DOM, 通过 setState 来改变 state, 渲染 DOM, 所以不需要 eventListener 或者其他的 dirty checking.
- just JS

----

## how to build a large app with React?
By Building a bunch of small apps
建立一系列小组件, 拼接在一起

## pros on declarative programing? 为什么用声明式 ---封装, 封装, 封装!
- reduce side effect
- minimize mutability
- more readable code
- less bugs

一般来说就是调用 api 而不是具体的执行过程( 比如用 for 循环和用 map), 减少数据的操作和处理, 代码更少, 出错几率越小. 核心思想就是写 what 而不写 how

`( 实际上写 react 大部分都容易把程序写在 render method 里面, 导致了 render 里面复杂很长的深 V 型程序, 这就与 react 的 declarative 的想法是相悖的, 在复杂的判断时, 要么用函数来处理, 要不分离出更小的组件 )`
