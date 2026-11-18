import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useTheme() {
  const initial = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  const [theme, setTheme] = useLocalStorage('mh_theme', initial)
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  return [theme, setTheme]
}
