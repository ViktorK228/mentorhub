import { STAGES, XP_PER_ITEM } from '../data'
import { slotEnd, toDate } from '../utils'
import { Button, Card, Heading, LinkButton, Notice } from './ui'
import ProgressPanel from './ProgressPanel'
import { MeetingCard } from './Bookings'

export default function Roadmap({ user, done, doneCount, toggle, notice, bookings, goAchievements, goMentors }) {
  const firstName = user.name.split(' ')[0]
  const currentStage = STAGES.findIndex((s) => s.items.some((i) => !done[i.id]))
  const nextItem = STAGES.flatMap((s) => s.items).find((i) => !done[i.id])
  const upcoming = [...bookings].filter((b) => toDate(b.date, slotEnd(b.time)) > new Date())
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0]

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)_minmax(0,1fr)]">
      <Card>
        <Heading title={`Привіт, ${firstName}!`} sub={currentStage === -1 ? 'Онбординг завершено' : `Етап ${currentStage + 1} з ${STAGES.length} · ${STAGES[currentStage].title}`} />
        <ProgressPanel doneCount={doneCount} />
        <div className="mt-5">
          {notice ? <Notice kind={notice.kind}>{notice.text}</Notice>
            : nextItem ? <Notice kind="warning">Наступний крок: {nextItem.text}.</Notice>
            : <Notice>Онбординг завершено! Вітаємо в команді.</Notice>}
        </div>
        <LinkButton onClick={goAchievements} className="mt-4">Мої досягнення і рівні</LinkButton>
      </Card>

      <Card className="space-y-6">
        {STAGES.map((s, idx) => {
          const n = s.items.filter((i) => done[i.id]).length
          return (
            <div key={s.id}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold">{idx + 1}. {s.title}</h2>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${n === s.items.length ? 'bg-success text-white' : 'bg-line text-muted'}`}>{n}/{s.items.length}</span>
              </div>
              <ul className="space-y-3">
                {s.items.map((i) => {
                  const checked = !!done[i.id]
                  return (
                    <li key={i.id}>
                      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-field hover:shadow-soft">
                        <input type="checkbox" id={`item-${i.id}`} name={`item-${i.id}`} checked={checked} onChange={() => toggle(i.id)} className="sr-only" />
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition ${checked ? 'animate-pop border-accent-2 bg-accent-2 text-on-btn' : 'border-field'}`}>
                          {checked && <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L19 7" /></svg>}
                        </span>
                        <span className="min-w-0">
                          <span className={`block font-bold ${checked ? 'text-muted' : ''}`}>{i.text}</span>
                          <span className="block text-sm text-muted">{checked ? 'Виконано' : `+${XP_PER_ITEM} XP`}</span>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </Card>

      <Card>
        <h2 className="mb-5 text-2xl font-semibold">Найближча зустріч</h2>
        {upcoming ? <MeetingCard b={upcoming} /> : <p className="rounded-2xl border border-line p-5 text-sm text-muted">Запланованих зустрічей поки немає.</p>}
        <p className="mt-5 text-sm text-muted">{upcoming ? 'Потрібна ще одна консультація? Підберіть ментора за навичками.' : 'Ще немає власного ментора? Підберіть за навичками.'}</p>
        <Button onClick={goMentors} className="mt-4 w-full">Знайти ментора</Button>
      </Card>
    </div>
  )
}
