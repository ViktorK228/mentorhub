import { useState } from 'react'

// Черга тостів: кожен зникає через 1.8 с (тривалість CSS-анімації animate-toast)
export function useToasts() {
  const [toasts, setToasts] = useState([])
  const pushToast = (text) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1800)
  }
  return [toasts, pushToast]
}
