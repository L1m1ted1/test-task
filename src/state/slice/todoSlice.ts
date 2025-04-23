import {createSlice ,PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    name: string;
    description: string;
    status: boolean;
}


const initialState: Todo[] = [
    {
        id: 1,
        name: "INV001",
        description: "Paid",
        status: false,
    },    {
        id: 2,
        name: "INV001",
        description: "Paid",
        status: true,
    },    {
        id: 3,
        name: "INV001",
        description: "Paid",
        status: true,
    },    {
        id: 4,
        name: "INV001",
        description: "Paid",
        status: true,
    },    {
        id: 5,
        name: "INV001",
        description: "Paid",
        status: true,
    },

]

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers:{
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            return state.filter((todo) => todo.id !== action.payload)
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.findIndex((t) => t.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        toggleStatus: (state, action: PayloadAction<number>) => {
            const todo = state.find((t) => t.id === action.payload)
            if (todo) {
                todo.status = !todo.status
            }
        },
    }
})


const { reducer: todoReducer , actions } = todoSlice

const todoActions = {...actions}

export {
    todoReducer, todoActions
}
