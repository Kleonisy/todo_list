import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared'
import { setFilter } from '../todosSlice.ts'
import type { FilterType, Todo } from '../types'

export const useTodoFilters = () => {
  const dispatch = useAppDispatch()
  const { items, filter } = useAppSelector((state) => state.todos)

  const handleFilterChange = useCallback(
    (newFilter: FilterType) => {
      dispatch(setFilter(newFilter))
    },
    [dispatch],
  )

  const filteredTodos = useMemo(() => {
    return items.filter((todo: Todo) => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })
  }, [items, filter])

  const activeCount = useMemo(() => {
    return items.filter((todo: Todo) => !todo.completed).length
  }, [items])

  return {
    filter,
    filteredTodos,
    activeCount,
    handleFilterChange,
  }
}
