import { useCallback, useRef } from 'react'

interface UseDragAndDropReturn {
  dragItem: React.MutableRefObject<number | null>
  dragOverItem: React.MutableRefObject<number | null>
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void
  handleDragEnter: (e: React.DragEvent<HTMLLIElement>, index: number) => void
  handleDragEnd: (e: React.DragEvent<HTMLLIElement>) => void
}

export const useDragAndDrop = (
  onReorder: (fromIndex: number, toIndex: number) => void,
): UseDragAndDropReturn => {
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLLIElement>, index: number) => {
      dragItem.current = index
      e.currentTarget.style.opacity = '0.5'
    },
    [],
  )

  const handleDragEnter = useCallback(
    (_e: React.DragEvent<HTMLLIElement>, index: number) => {
      dragOverItem.current = index
    },
    [],
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLLIElement>) => {
      e.currentTarget.style.opacity = '1'

      if (
        dragItem.current !== null &&
        dragOverItem.current !== null &&
        dragItem.current !== dragOverItem.current
      ) {
        onReorder(dragItem.current, dragOverItem.current)
      }

      dragItem.current = null
      dragOverItem.current = null
    },
    [onReorder],
  )

  return {
    dragItem,
    dragOverItem,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  }
}
