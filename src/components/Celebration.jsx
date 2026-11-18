import { Button } from './ui'

export default function Celebration({ level, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => onClose()}>
      <div onClick={(e) => e.stopPropagation()} className="animate-pop w-full max-w-sm rounded-3xl border border-accent-2/40 bg-surface p-8 text-center shadow-2xl">
        <div className="text-6xl">🎉</div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent-ink">Новий рівень!</p>
        <h3 className="mt-1 text-2xl font-bold">{level}</h3>
        <p className="mt-2 text-sm text-muted">Чудова робота — продовжуй у тому ж дусі.</p>
        <Button onClick={() => onClose()} className="mt-6 w-full">Далі</Button>
      </div>
    </div>
  )
}
