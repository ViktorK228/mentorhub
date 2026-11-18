import { CANCEL_HOURS } from '../data'
import { formatDay, plural, slotEnd, toDate } from '../utils'
import { Button, Card, Heading, LinkButton, Notice } from './ui'

export function MeetingCard({ b, onCancel }) {
  const start = toDate(b.date, b.time)
  const isOver = toDate(b.date, slotEnd(b.time)) < new Date()
  const canCancel = start - new Date() >= CANCEL_HOURS * 3600 * 1000
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft ${isOver ? 'opacity-60' : ''}`}>
      <p className="font-bold">{formatDay(b.date)} · {b.time}–{slotEnd(b.time)}</p>
      <p className="mt-2 text-sm text-muted">Ментор: {b.mentorName}</p>
      <p className="mt-1 text-sm">{b.role}</p>
      {onCancel && (isOver ? <p className="mt-2 text-sm text-muted">Зустріч відбулася</p>
        : canCancel ? <LinkButton danger onClick={() => onCancel(b.id)} className="-ml-3 mt-1">Скасувати зустріч</LinkButton>
        : <p className="mt-2 text-sm text-muted">Скасування недоступне: до початку менше {CANCEL_HOURS} год</p>)}
      {!onCancel && !canCancel && !isOver && <p className="mt-2 text-sm text-muted">Скасування недоступне: до початку менше {CANCEL_HOURS} год</p>}
    </div>
  )
}

export default function Bookings({ bookings, notice, onCancel, goMentors }) {
  const sorted = [...bookings].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  const upcomingCount = bookings.filter((b) => toDate(b.date, slotEnd(b.time)) > new Date()).length
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]">
      <Card>
        <Heading title="Мої зустрічі" sub={`${upcomingCount} ${plural(upcomingCount, 'запланована', 'заплановані', 'запланованих')}`} />
        {notice && <div className="mb-4"><Notice kind={notice.kind}>{notice.text}</Notice></div>}
        <Button onClick={goMentors} className="w-full">Забронювати нову зустріч</Button>
      </Card>
      <Card>
        <h2 className="mb-5 text-2xl font-semibold">Заплановані</h2>
        {sorted.length === 0
          ? <p className="rounded-2xl border border-line p-6 text-center text-muted">Поки немає зустрічей. Знайдіть ментора у вкладці «Ментори».</p>
          : <div className="grid gap-4 xl:grid-cols-2">{sorted.map((b) => <MeetingCard key={b.id} b={b} onCancel={onCancel} />)}</div>}
        <p className="mt-5 text-sm text-muted">Обидві сторони бачать зустріч у своєму списку.</p>
      </Card>
    </div>
  )
}
