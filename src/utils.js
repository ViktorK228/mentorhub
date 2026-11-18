import { LEVELS } from './data'

export const levelOf = (xp) => LEVELS.reduce((acc, l, i) => (xp >= l.min ? i : acc), 0)
export const initials = (name) => name.split(' ').map((w) => w[0]).join('')
export const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few
  return many
}

/* ---------- дата/час ---------- */
export const pad = (n) => String(n).padStart(2, '0')
export const localDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
// Слоти по 30 хв: зустріч починається не раніше 9:00 і завершується до 18:00
export const SLOTS = Array.from({ length: 18 }, (_, i) => `${pad(9 + Math.floor(i / 2))}:${i % 2 ? '30' : '00'}`)
export const slotEnd = (t) => { const [h, m] = t.split(':').map(Number); const e = h * 60 + m + 30; return `${pad(Math.floor(e / 60))}:${pad(e % 60)}` }
export const toDate = (date, time) => new Date(`${date}T${time}:00`)
export function formatDay(date) {
  if (date === localDate(new Date())) return 'Сьогодні'
  const s = toDate(date, '00:00').toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'long' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export const formatLongDay = (date) => {
  const s = toDate(date, '00:00').toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}
