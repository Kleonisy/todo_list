import type { Todo } from '../types'

export const todoUtils = {
  generateId(): string {
    return crypto.randomUUID()
  },

  createTodo(title: string): Todo {
    return {
      id: this.generateId(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    }
  },

  isValidTodoTitle(title: string): boolean {
    return title.trim().length > 0
  },
}
