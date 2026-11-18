export default function Toast({ toasts }) {
  return (
    // role="status" + aria-live: скрінрідери озвучують появу тосту, а тести можуть знайти його за роллю
    <div role="status" aria-live="polite" aria-label="Сповіщення" className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="animate-toast rounded-full bg-accent-ink px-4 py-2 text-sm font-bold text-on-btn shadow-lg">{t.text}</div>
      ))}
    </div>
  )
}
