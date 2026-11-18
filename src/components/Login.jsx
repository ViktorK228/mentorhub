import { useState } from 'react'
import { Button, Logo } from './ui'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const emailErr = !/^[^\s@]+@mentorhub\.ua$/i.test(email.trim())
  const passErr = password.length < 8

  const submit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (emailErr || passErr) return
    const local = email.trim().split('@')[0]
    const name = local.split(/[._-]/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
    onLogin({ email: email.trim(), name })
  }
  const field = (err) => `mt-1.5 w-full rounded-xl border bg-surface px-5 py-3.5 font-bold outline-none transition placeholder:font-normal placeholder:text-faint focus:border-btn ${err ? 'border-error-2' : 'border-field'}`

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center border-line bg-surface px-6 py-12 md:border-r md:px-10">
        <div className="max-w-lg">
          <Logo big />
          <h1 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">Швидка адаптація нових працівників</h1>
          <p className="mt-4 italic text-muted">Дорожня карта, ментори та бронювання 1-on-1 — в одному місці.</p>
          <div className="mt-5 space-y-3">
            {['Дорожня карта з чек-листами та прогресом', 'Ментор за навичками — за хвилину', 'Зустрічі 1-on-1 у два кліки'].map((t) => (
              <div key={t} className="flex items-stretch gap-4 rounded-2xl border border-line p-5"><span className="w-1.5 rounded-full bg-accent-2" /><span className="font-bold">{t}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-12">
        <form onSubmit={submit} noValidate className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-soft md:p-8">
          <h2 className="text-2xl font-semibold">Вхід до MentorHub</h2>
          <p className="mt-3 text-sm text-muted">Використовуйте робочий акаунт компанії</p>
          <label className="mt-5 block text-sm text-muted">Робоча пошта
            <input id="login-email" name="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name.surname@mentorhub.ua" className={`${field(touched && emailErr)} text-ink`} />
          </label>
          <p className={`mt-1.5 text-sm ${touched && emailErr ? 'text-error-2' : 'text-muted'}`}>Корпоративна адреса @mentorhub.ua</p>
          <label className="mt-4 block text-sm text-muted">Пароль
            <input id="login-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${field(touched && passErr)} text-ink`} />
          </label>
          <p className={`mt-1.5 text-sm ${touched && passErr ? 'text-error-2' : 'text-muted'}`}>Щонайменше 8 символів</p>
          <Button type="submit" className="mt-6 w-full">Увійти</Button>
          <p className="mt-4 text-center text-xs text-muted">Демо-режим: дані зберігаються лише у вашому браузері.</p>
        </form>
      </div>
    </div>
  )
}
