# combineReducer

a combination of different data of reducer
if the state contains different type of database which is normal.
`一般情况下, state 里面都会有不同类型的数据, 比如 todo,goal, blog, comment 等等`

```
state ={
    todo: [],
    blogs: [],
}
```

so most likely the reducer will be the situation as below, it contains a bunch of database

```js
const combineReducer = (state={}, action) {
    return {
        todo: todo(state.todos, action)
        blog: blog(state.blogs, action)
    }
}

```


### use table-driven method instead of switch
`使用表驱动法而不是 catch case, 对 todo 的具体 reducer 函数`
`我的思路是在不同的类型 state 的文件里面只建立对应的 map, 然后在 combineReducer 的文件里面统一转为 state`

```js

const addTodo = (state, action) => {
    return state.concat([action.todo])    
}

const deleteTodo = (state, action) => {
    return state.filter((todo) => todo.id !== action.id )
}

const updateTodo = (state, action) => {
    let newState = state.map((todo) => {
        if (todo.id !== action.id) {
            return todo
        } else {
            return  {...todo, ...action.todo }
        }
    })

    return newState
}

let todoMap = () => {
    let mapper = {
        'ADD_TODO': addTodo,
        'DELETE_TODO': deleteTodo,
        'UPDATE_TODO': updateTodo,
    }
    return mapper
}


// 这个 mapper 可以抽象出去到 总的 combinerReducer 上面

const mapper = (map) => {
    let f = (state={}, action) => {
        let schema = map()
        let key = action.type
        let value = schema[key]
        if ( value !== undefined ) {
            state = value(state, action)
        }
         return state
    }
    return f
}

const combineReducer = (state={}, action) {
    return {
        todo: mapper(todoMap)(state.todos, action),
        // blog: mapper(state.blogs, action),
    }
}

let action = {
    type: 'ADD_TODO',
    todo: {
        id: '1',
        task: 'iifj',
        complete: false,
    }
}


```

### reducer library `自己实现的 redux 的库`

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

let store = createStore(combineReducer)

let action = {
    type: 'ADD_TODO',
    todo: {
        id: 0,
        task: 'iifj',
        complete: false,
    }
}

let subscribe = store.subscribe(() => console.log(store.getState() ))

// abstract type to an action

handleAddTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo,
    }
}

store.dispatch(handleAddTodo(todo))

store.getState()


```
