import { useState } from 'react'
import { CANCEL_HOURS } from '../data'
import { SLOTS, formatLongDay, localDate, pad, slotEnd } from '../utils'
import { Button, Card, Heading } from './ui'
import MentorCard from './MentorCard'

// Бронювання 1-on-1. За мокапами це окремий екран, а не спливаюче вікно; назву збережено з ТЗ.
export default function BookingModal({ mentor, bookings, onBack, onConfirm }) {
  const now = new Date()
  const today = localDate(now)
  const nowTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  const isTaken = (t) => bookings.some((b) => b.mentorId === mentor.id && b.date === date && b.time === t)
  const isPast = (t) => date < today || (date === today && t <= nowTime)

  const submit = () => {
    if (!date) return setError('Оберіть дату')
    if (date < today) return setError('Не можна обрати минулу дату')
    if (!time) return setError('Оберіть час')
    if (!SLOTS.includes(time)) return setError('Час бронювання — лише з 9:00 до 18:00')
    if (isPast(time)) return setError('Цей час уже минув')
    if (isTaken(time)) return setError('Ви вже забронювали цього ментора на цей час')
    onConfirm({ id: Date.now(), mentorId: mentor.id, mentorName: mentor.name, role: mentor.role, date, time })
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)]">
      <Card>
        <Heading title="Бронювання" sub="Зустріч 1-on-1 · 30 хв" back={onBack} />
        <MentorCard m={mentor} selected={mentor.selected ?? []} highlight />
        <p className="mt-5 italic text-muted">«{mentor.bio}»</p>
      </Card>

      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">{date ? formatLongDay(date) : 'Оберіть дату'}</h2>
          <input type="date" id="booking-date" name="booking-date" min={today} value={date} aria-label="Дата"
            onChange={(e) => { setDate(e.target.value); setTime(''); setError('') }}
            className="rounded-xl border border-field bg-surface px-4 py-2 font-semibold outline-none focus:border-btn" />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-9">
          {SLOTS.map((s) => {
            const taken = isTaken(s), past = isPast(s), chosen = time === s
            const label = taken ? 'Зайнято' : past ? 'Минув' : chosen ? 'Обрано' : 'Вільно'
            return (
              <button key={s} disabled={taken || past} onClick={() => { setTime(s); setError('') }}
                className={`rounded-xl border py-3 text-center transition ${chosen ? 'border-btn bg-btn text-on-btn'
                  : taken ? 'cursor-not-allowed border-transparent bg-btn-off text-faint'
                  : past ? 'cursor-not-allowed border-line text-faint'
                  : 'border-field hover:border-btn'}`}>
                <span className="block font-bold">{s}</span>
                <span className="block text-xs">{label}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-5 text-sm text-muted">Час — з 9:00 до 18:00. Зайняті та минулі слоти недоступні. Скасувати зустріч можна не пізніше ніж за {CANCEL_HOURS} год до початку.</p>
        {error && <p className="mt-3 text-sm text-error-2">{error}</p>}
        <Button onClick={submit} disabled={!time} className="mt-5">{time ? `Забронювати ${time}–${slotEnd(time)}` : 'Оберіть час'}</Button>
      </Card>
    </div>
  )
}
