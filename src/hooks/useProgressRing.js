import { useState, useEffect } from 'react'

export function useProgressRing(loadedCount, totalCount, radius = 50) {
  const [progress, setProgress] = useState(0)
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (totalCount && totalCount > 0) {
      const percent = Math.min(loadedCount / totalCount, 1)
      setProgress(circumference - percent * circumference)
    }
  }, [loadedCount, totalCount, circumference])

  return { progress, circumference, radius }
}
