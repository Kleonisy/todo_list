import { useDragAndDrop, useTodoFilters, useTodos } from '../hooks'
import AddTodo from './AddTodo/AddTodo.tsx'
import TodoFilters from './TodoFilters/TodoFilters.tsx'
import TodoItem from './TodoItem/TodoItem.tsx'
import styles from './TodosList.module.css'

export default function TodosList() {
  const {
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleReorderTodos,
  } = useTodos()
  const { filter, filteredTodos, activeCount, handleFilterChange } =
    useTodoFilters()
  const { handleDragStart, handleDragEnter, handleDragEnd } =
    useDragAndDrop(handleReorderTodos)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>

      <AddTodo onAdd={handleAddTodo} />

      <TodoFilters currentFilter={filter} onFilterChange={handleFilterChange} />

      {filteredTodos.length === 0 ? (
        <p className={styles.emptyMessage}>
          {filter === 'all'
            ? 'No todos yet. Add one above!'
            : `No ${filter} todos.`}
        </p>
      ) : (
        <ul className={styles.todoList}>
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
            />
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <span>
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>
      </div>
    </div>
  )
}
