import { useCallback, useState } from 'react'
import type { Todo } from '../../types'
import styles from './TodoItem.module.css'

interface TodoItemProps {
  todo: Todo
  index: number
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => boolean
  onDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void
  onDragEnter: (e: React.DragEvent<HTMLLIElement>, index: number) => void
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void
}

export default function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)

  const handleToggle = useCallback(() => {
    onToggle(todo.id)
  }, [todo.id, onToggle])

  const handleDelete = useCallback(() => {
    onDelete(todo.id)
  }, [todo.id, onDelete])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
    setEditValue(todo.title)
  }, [todo.title])

  const handleSaveEdit = useCallback(() => {
    const success = onEdit(todo.id, editValue)
    if (success) {
      setIsEditing(false)
    } else {
      setEditValue(todo.title)
      setIsEditing(false)
    }
  }, [todo.id, todo.title, editValue, onEdit])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSaveEdit()
      } else if (e.key === 'Escape') {
        setEditValue(todo.title)
        setIsEditing(false)
      }
    },
    [handleSaveEdit, todo.title],
  )

  return (
    <li
      className={styles.todoItem}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={styles.checkbox}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'not completed' : 'completed'}`}
        />

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            aria-label="Edit todo"
          />
        ) : (
          <button
            type="button"
            className={`${styles.titleButton} ${
              todo.completed ? styles.completed : styles.title
            }`}
            onClick={handleEdit}
          >
            {todo.title}
          </button>
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing && (
          <>
            <button
              type="button"
              onClick={handleEdit}
              className={styles.editButton}
              aria-label={`Edit "${todo.title}"`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
              aria-label={`Delete "${todo.title}"`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}
