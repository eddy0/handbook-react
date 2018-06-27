# redux  

## conclusion
- store 是保存 state 的容器
- getState 是获取当前所有的 store
- subscribe 是注册监听函数, 调用这个函数返回取消监听
- action 是提供 state change 的信息, state 改变的 type 和必要信息, action 还包括了交互之后向 database 获取的新的 data 或者 state `action 就是存在各个组件里面原来更新 state 的行为, 比如点击按钮提交删除等等行为`
- reducer 是 state 改变的具体方法 (how), 如果 action.type 满足条件, 则根据 action 提供的信息和以前的 state 来生成新的 state
- dispatch 是通过传入参数 即具体的 action, 来执行 reducer 函数, 更新 state, 触发 state 改变的监听

## redux goal and philosophy
- make the state more predictable `增加程序的可预测性`
- less bugs `更少的代码`
- separate data logic and UI logic `分离数据处理逻辑和 UI 渲染逻辑, React 负责渲染UI, redux 负责处理数据`

## why redux?
in react, there are tons of state throughout the app, to make the state more predictable and manageable, what about put all state into on place (like state tree), state management library, and then spread across the entire app to specific location.

`react app 中会存在许多的 state, 并且散布在各个组件之中, 这种增加了出现 bug 的风险和 debug 的难度, 为了让程序易于管理和预测, 可以考虑把所有的 state 放到一个地方( state tree), 也就是 store 的理念.`

- benefit of state tree  `数据放在一起的好处`
    - shared cache  `不同组件如果用到相同的数据, 则数据可以共享`
    - predictable state change `数据的改变容易监控, 只要看一个地方就行`
    - improved developer tools  `同上, 因为在一起, 所以容易debug`
    - pure function `纯函数就是增加可预测性的`
    - sever side rending `因为在一起, 服务器请求发送也方便`

## how state tree works? ---- Store `store 需要做的事情`
state 放在一起了, 然后呢?? 也就是 store 的功能是什么?

1. place to store all the state  `本身能装所有 state 的容器`
2. get data, build state tree `首先最基本的是要获取 state tree, 也就是所有的 state, 即 data`
3. listen  `监听 state tree 里面的变化`
4. update changes  `对改变的 state 进行更新, 从而更新 UI`

## how to build Store?  `基于以上 store 要做的事情, 如何创建 Store 的函数? `

1. state and getState `获取所有的 state `

```js
// craete store 返回的是调用 api 的函数, createStore().getState()
const createStore = () => {
    // all state
    let state
    // all listners
    let api = {}

    // get all state 获取所有的 state
    api.getState = function () {
                        return state                            
                    }

    return api
}

let store = createStore()
store.getState()

```

2. add listener `增加/订阅 state 改变的监听函数, 用一个 array 来保存所有的监听函数`

```js
const createStore = () => {
    // all listners
    let listeners = []
    let api = {}

    // add listener  订阅-- 增加监听函数, 并且返回取消监听的函数
    api.subscribe = function (listener) {
        listeners.push(listener)
        return function () {
            listeners = listeners.filter((l) => l !== listener )
        }
    }

    return api
}

// add listener to the Store
let listener = createStore.subscribe(() => {
    console.log('listen to change')
})

// when return , remove listener
let  removeListener = listener()

```

3. update state by dispatch `更新 state, 引入 action 和 reducer, dispatch 的概念`

update state need to know which to update and how to update, so we need the action to describe the information we need. details below
`更新 state 需要知道更新什么 state (更新 state 的理由) 以及更新 state 的必要的信息, 比如:  1)需要 add todo 还是 delete todo 或者 add comment, 需要知道更新 state 的类型是什么; 2) 以及提供 add todo 的 todo 信息 或者 提供 delete todo 的 id , 这就是 aciton 的作用`

update state will take advantage of current state and action.

`通过 dispatch 的 api 来更新 state, 并且调用改变 state 的监听函数, 这就需要知道特定的 action 是什么, 所以会接受一个 action 作为参数, 通过 updateState 函数来更新 state , 然后调用 listener 里面保存的函数 `

```js
const createStore = () => {
    // all state
    let state
    // all listners
    let listeners = []
    let api = {}

    // dispatch is to update state and call all the listeners
    api.dispatch = function (action) {
                        state = updateState(state, action)

                        listeners.forEach((listener) => {
                            listener()
                    })
    }

    return api
}

// action provide the type and info,
// action 提供了 type 和信息
let action = {
    type: 'ADD_TODO'
    todo: {
        id: 0,
        task: 'iifj',
        complete: false,
    }
}

createStore.dispatch(action)

```
updateState is excuted based on current state and the action passed in
`updateState 根据当前的 state 以及 传入 具体的 action 来返回新的 state, 需要判断 action.type 是什么, 通过不同的 type 来处理数据----updateState 就是 reducer `

```js

// reducer update the state based on the action
//  reduer
const updateState = (state=[], action) => {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    } else if (action.type === 'DELETE_TODO')) {
        return state.filter((todo) => todo.id !== action.id)
    }
}

```

### why we need action?
we need a way to describe state changes in the app, actions send the instruction of what type of transformation needs to be made and relevent information

`action 是一个对象, 描述更新 state 的目的/类型 ( type ) 和所需要提供的信息, state 的更新基于提供的 action 信息`

#### reducer is a pure function  `通过 reducer 来更新 state, reducer 需要是一个纯函数, 也就是说 action 如果一定, reducer 更新 state 的结果也是固定的 `

- 什么是纯函数, 为什么纯函数可以预测?
    - Pure functions always return the same result given the same arguments `相同的参数返回相同的结果 比如 x + y, 相同是 x,y 得到的结果一定是一样的`
    - Pure function's execution doesn't depend on the state of the application `执行不依赖于 state, 只取决于传入的是什么变量`
    - Pure functions don't modify the variables outside of their scope. no side effect `运行不会改变外部变量比如 concat, slice, map, fitler, immutable`

----

#### wrap it
give reducer function a separate file and pass it to crateStore

```js

const createStore = (reducer) => {
    let state
    let listeners = []
    let api = {}

    api.getState = () => state                            

    api.subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener )
        }
    }

    api.dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => {
                listener()
            })
        }

    return api
}


// action provide the type and info,
// action 提供了 type 和信息

let store = createStore(reducer)

let action = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        task: 'iifj',
        complete: false,
    }
}

let subscribe = store.subscribe(() => console.log(store.getState() ))

store.dispatch(action)

store.getState()

```
