const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const FETCH_DATA = 'FETCH_DATA'

const actionAddTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const actionDeleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id
    }
}

const actionUpdateTodo = (id) => {
    return {
        type: UPDATE_TODO,
        id
    }
}

const actionFetchData = (todos) => {
    return {
        type: FETCH_DATA,
        todos
    }
}
