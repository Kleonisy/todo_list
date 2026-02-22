import { STORAGE_KEYS } from '../constants'
import type { Todo } from '../types'

export const storageService = {
  loadTodos(): Todo[] {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEYS.TODOS)
      if (savedTodos) {
        return JSON.parse(savedTodos)
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error)
    }
    return []
  },

  saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos))
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error)
    }
  },

  clearTodos(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TODOS)
    } catch (error) {
      console.error('Failed to clear todos from localStorage:', error)
    }
  },
}
