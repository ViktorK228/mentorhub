import { expect } from '@playwright/test'

/** Скриншот сторінки: прокрутка вгору, CSS-анімації/переходи домотуються до кінцевого стану */
export async function shot(page, name) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `test-screenshots/${name}.png`, fullPage: true, animations: 'disabled' })
}

export async function login(page, email = 'test@mentorhub.ua', password = '12345678') {
  await page.goto('/')
  await page.getByLabel('Робоча пошта').fill(email)
  await page.getByLabel('Пароль').fill(password)
  await page.getByRole('button', { name: 'Увійти' }).click()
  await expect(page.getByRole('button', { name: 'Вийти' })).toBeVisible()
}

export const nav = (page, name) => page.locator('header nav').getByRole('button', { name, exact: true }).click()

/** Дата YYYY-MM-DD у локальному часовому поясі (той самий, що й у браузера Playwright) */
export const isoDate = (offsetDays) => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** Читає з лівої панелі «Карти»: відсоток, «N з 15 кроків виконано», «X XP» */
export async function progress(page) {
  const text = await page.locator('main section').first().innerText()
  return {
    xp: Number(text.match(/(\d+) XP/)[1]),
    pct: Number(text.match(/(\d+)%/)[1]),
    steps: Number(text.match(/(\d+) з \d+ кроків/)[1]),
  }
}
