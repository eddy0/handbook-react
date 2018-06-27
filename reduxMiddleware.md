# redux Middleware

#### add a middleware `给增加一个拦截器, 也是通过闭包来实现的`

实际上就是在 dispatch 之前加上一个函数,  判断是否满足条件

```js

const store = createStore(combineReducer)

const checkAndDispatch = (store, action) => {
        if ( condition ) {
            //  do something else
            //   console.log(wrong data)
            //   如果满足条件, 则拦截下来
        } else {
            store.dispatch(action)
        }
    }
}

checkAndDispatch(store, action)

```

#### more elegant!! using closure for more middleware
`通过闭包的方式来实现拦截或者过滤的功能, 通过 next 加入更多的 middleware, 通过 applymiddleware 来 hook it to store `
applyMiddleware 是在 dispatch 运行的时候先运行 middleware.

```js

const store = Redux.createStore(Redux.combineReducers({
    todos,
    dududu,
}), Redux.applyMiddleware(check))

// access to store
const check = (store) => {
    // access to next middleware
    return (next) => {
        return (action) => {
            if (condition) {
                // console.log()
                // return
            } else {
                next(action)
            }
        }
    }
}

// check = store => next => action => {}

```


### we also need action to connect with database `把 async 的问题放到 action 里面`
when we click the button to add todo or delete todo, we'd like the inside the react, it only need to call the dispatch api, and the rest will be took over by actions for the new state or data
`我们的理念是尽量在 react 里面写 what 而不写 how, 尽量简化 react 复杂度. 所以考虑与 database 的数据处理不服也放到 redux 里面, 这样使得程序更加可以预测并且统一, react 只渲染 UI, redux 处理数据`

##### issue to fix: how to how the specific component that toggle the action, how to get access to the dispatch?? closure!!
```js
// 一般 callback 是因为比如 add todo, 之后要把 input 清空
const handleActionAddTodo = (todo, callback) => {
    return (dispatch) => {
        return API.saveTodo(todo)
        .then((todo) => {
            dispatch(actionAddTodo(todo))
            callback()
        )
    }
}

// use a thunk to apply a middleware to pass dispatch to handleActionAddTodo
// 如果 action 返回的是一个函数, 也就是一个闭包, 则 把 store.dispatch 传进去
const thunk  = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch)
    }

    return next(action)
}
```


#### how to pass store to anywhere we need when we have too much nested component --- work together with redux and react -- context

## context API
in order to pass the variable to nested component easily.
`context 是为了解决父子层层传递的问题而出现的`

```js
const Context = React.creatContext()

// 父组件设置 value
<Context.Provider value={name}> </Context.Provider>

// 子组件得到value
<Context.Consumer value={name}> </Context.Consumer>

```
所以有了 context 之后, 可以把 dispatch 放入到 context api 里面, 这样就可以在 app 的各个地方都传入 dispatch , 然后与 action 连接起来就方便了


```js
const Context = React.creatContext()

class Provider extends React.Component{
    render() {
        return (
            <Context.Provider value={this.props.store}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
)

```

#### how child component get the store?   adding a component wrap it with Context.Consumer

`子组件如何得到传递的 store? 通过再一层 component, 通过 Context.Consumer 把 dispatch 传递进去`

```
class ConnectedTodo extends React.Component{
    render() {
        return (
            <Context.Consumer>
                {
                    (store) => {
                        const {todos} = store.getState()
                        return (
                            <Todo todos={todos} dispatch={store.dispatch}>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}



```


#### more abstract, encapsulate Context!!

the goal: render any component and pass the component any data it need from store -- connect
`需求是封装 context API, 把 Context.Consumer 封装进去, 不需要每次再建立一个父 component, 而是只用一个函数就可以解决, 目的是渲染任何 component, 并且把想要的 data 传进去, 方法: 还是闭包!`

connect 函数应该有可以传递 dispatch 的功能, 并且可以过滤一遍 store 的数据, 只传入 component 需要的数据, 即封装上面的 Comsumer 的代码

所以需要提供出去的就只有初始化的 Provider 和 connet 函数, 任何需要 连接 store 的 component 只要加一层函数或者拦截器就好了

```js
// something like below, only pass the data we need to App component
const ConnetedApp = connect((state) => {
    return {
        todos: state.todos
    }
})(App)

```

so how to implement connet function?
`难点在于如何 forceUpdate, 在state update 的时候自动更新? 这就需要一个父组件传入 state `
    - 把 data 的过滤放到 mapStateToProps 函数里面
    - 把需要的 component 传入当做参数进去, 返回一个新的 component
    - 新的 component 有 Context.Consumer, 所以可以得到 store, 这个新的 component 会调用 mapStateToProps的函数, 并且自动更新, 把过滤好的数据给 参数中的 component


```js
const connect = (mapStateToProps) => {
    return (Component) => {
        class Receiver extends React.Component{
            componentDidMount() {
                const {subscribe} = this.props.store
                this.unsubscribe = subscribe(() => this.forceUpdate())
            }

            componentWillUnmount() {
                this.unsubscribe()
            }

            render() {
                const {dispatch, getState} = store
                const state = getState()
                const data = mapStateToProps(state)
                return (
                    <Component dispatch={dispatch}  {...data} />
                )
            }
        }


        class ConnectedComponent extends React.Component{
            render() {
                return (
                    <Context.Consumer>
                    {
                        (store) => {
                            return (
                                <Receiver store={store}   />
                            )
                        }
                    }
                    </Context.Consumer>    
                )
            }
        }

        return ConnectedComponent
    }    
}

```


#### wrap up together ---> react-redux library

this is what react-dux under the hook!

```js
<ReactRedux.Provider></ReactRedux.Provider>
ReactRedux.connect
```
