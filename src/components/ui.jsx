/* Базові UI-компоненти дизайн-системи */
export const Card = ({ className = '', children }) => (
  <section className={`rounded-3xl border border-line bg-surface p-6 shadow-soft transition-[background-color,border-color,box-shadow] duration-300 ${className}`}>{children}</section>
)
export const Button = ({ className = '', ...p }) => (
  <button {...p} className={`rounded-xl bg-btn px-5 py-3 font-bold text-on-btn transition hover:bg-btn-hover disabled:cursor-not-allowed disabled:bg-btn-off disabled:text-faint ${className}`} />
)
export const LinkButton = ({ className = '', danger, ...p }) => (
  <button {...p} className={`px-3 py-1 text-left font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${danger ? 'text-error-2 hover:opacity-80' : 'text-btn hover:text-btn-hover'} ${className}`} />
)
export const BackButton = ({ onClick }) => (
  <button onClick={onClick} aria-label="Назад" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-xl text-ink hover:bg-white/5">‹</button>
)
export const Notice = ({ kind = 'success', children }) => {
  const bar = { success: 'bg-success', info: 'bg-accent-2', warning: 'bg-warning', error: 'bg-error' }[kind]
  return (
    <div className="flex items-stretch gap-3 rounded-2xl border border-line p-4">
      <span className={`w-1.5 shrink-0 rounded-full ${bar}`} />
      <p className="text-sm font-bold">{children}</p>
    </div>
  )
}
export const Heading = ({ title, sub, back }) => (
  <div className="mb-5 flex items-start gap-3">
    {back && <BackButton onClick={back} />}
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {sub && <p className="mt-0.5 text-sm text-muted">{sub}</p>}
    </div>
  </div>
)
export const Logo = ({ big }) => (
  <div className="flex items-center gap-3">
    <div className={`grid place-items-center rounded-lg bg-btn font-semibold text-on-btn ${big ? 'h-12 w-12 text-xl' : 'h-8 w-8 text-sm'}`}>M</div>
    <span className={`font-semibold ${big ? 'text-4xl' : 'text-xl'}`}>MentorHub</span>
  </div>
)
