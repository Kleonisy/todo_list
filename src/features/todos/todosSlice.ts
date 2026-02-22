import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { storageService } from './services'
import type { FilterType, Todo } from './types'
import { todoUtils } from './utils'

interface TodosState {
  items: Todo[]
  filter: FilterType
}

const initialState: TodosState = {
  items: storageService.loadTodos(),
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = todoUtils.createTodo(action.payload)
      state.items.push(newTodo)
      storageService.saveTodos(state.items)
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        storageService.saveTodos(state.items)
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
      storageService.saveTodos(state.items)
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.items.find((t) => t.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
        storageService.saveTodos(state.items)
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = action.payload
      const [movedItem] = state.items.splice(fromIndex, 1)
      state.items.splice(toIndex, 0, movedItem)
      storageService.saveTodos(state.items)
    },
  },
})

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setFilter,
  reorderTodos,
} = todosSlice.actions
export default todosSlice.reducer
