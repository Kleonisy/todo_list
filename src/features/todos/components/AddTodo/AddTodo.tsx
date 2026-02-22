import { useCallback, useState } from 'react'
import styles from './AddTodo.module.css'

interface AddTodoProps {
  onAdd: (title: string) => boolean
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = useCallback(() => {
    const success = onAdd(inputValue)
    if (success) {
      setInputValue('')
    }
  }, [inputValue, onAdd])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddTodo()
      }
    },
    [handleAddTodo],
  )

  return (
    <div className={styles.inputSection}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className={styles.input}
        aria-label="New todo input"
      />
      <button
        type="button"
        onClick={handleAddTodo}
        className={styles.addButton}
        aria-label="Add todo"
      >
        Add
      </button>
    </div>
  )
}
