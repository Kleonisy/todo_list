import type { FilterType } from '../../types'
import styles from './TodoFilters.module.css'

interface TodoFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function TodoFilters({
  currentFilter,
  onFilterChange,
}: TodoFiltersProps) {
  return (
    <div className={styles.filterSection}>
      <button
        type="button"
        onClick={() => onFilterChange('all')}
        className={
          currentFilter === 'all'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        aria-label="Show all todos"
        aria-pressed={currentFilter === 'all'}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onFilterChange('active')}
        className={
          currentFilter === 'active'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        aria-label="Show active todos"
        aria-pressed={currentFilter === 'active'}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => onFilterChange('completed')}
        className={
          currentFilter === 'completed'
            ? styles.filterButtonActive
            : styles.filterButton
        }
        aria-label="Show completed todos"
        aria-pressed={currentFilter === 'completed'}
      >
        Completed
      </button>
    </div>
  )
}
