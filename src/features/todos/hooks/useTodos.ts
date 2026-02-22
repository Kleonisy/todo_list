import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared'
import {
  addTodo,
  deleteTodo,
  editTodo,
  reorderTodos,
  toggleTodo,
} from '../todosSlice.ts'
import { todoUtils } from '../utils'

export const useTodos = () => {
  const dispatch = useAppDispatch()
  const { items, filter } = useAppSelector((state) => state.todos)

  const handleAddTodo = useCallback(
    (title: string) => {
      const trimmedTitle = title.trim()
      if (todoUtils.isValidTodoTitle(trimmedTitle)) {
        dispatch(addTodo(trimmedTitle))
        return true
      }
      return false
    },
    [dispatch],
  )

  const handleToggleTodo = useCallback(
    (id: string) => {
      dispatch(toggleTodo(id))
    },
    [dispatch],
  )

  const handleDeleteTodo = useCallback(
    (id: string) => {
      dispatch(deleteTodo(id))
    },
    [dispatch],
  )

  const handleEditTodo = useCallback(
    (id: string, title: string) => {
      const trimmedTitle = title.trim()
      if (todoUtils.isValidTodoTitle(trimmedTitle)) {
        dispatch(editTodo({ id, title: trimmedTitle }))
        return true
      }
      return false
    },
    [dispatch],
  )

  const handleReorderTodos = useCallback(
    (fromIndex: number, toIndex: number) => {
      dispatch(reorderTodos({ fromIndex, toIndex }))
    },
    [dispatch],
  )

  return {
    todos: items,
    filter,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleReorderTodos,
  }
}
