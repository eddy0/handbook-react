
const addTodo = (state, action) => {
    return state.concat([action.todo])
}

const deleteTodo = (state, action) => {
    return state.filter((todo) => todo.id !== action.id)
}

const updateTodo = (state, action) => {
    return state.map((todo) => {
        if (todo.id !== action.id) {
            return todo
        } else {
            return Object.assign({}, todo, {complete: !todo.complete} )
        }
    })
}

const todoMap = () => {
    let map = {
        [ADD_TODO]: addTodo,
        [DELETE_TODO]: deleteTodo,
        [UPDATE_TODO]: updateTodo,
        [FETCH_DATA]: (state, action) => action.todos,
    }
    return map
}
