import { translations, type Lang, type TranslationKey } from './translations'

export function getLang(): Lang {
  if (typeof localStorage === 'undefined') return 'id'
  const stored = localStorage.getItem('lang') as Lang | null
  if (stored) return stored
  const pageLang = document.documentElement.lang as Lang
  return pageLang === 'en' ? 'en' : 'id'
}

export function setLang(lang: Lang) {
  localStorage.setItem('lang', lang)
  applyTranslations(lang)
  // Update toggle button
  document.querySelectorAll<HTMLElement>('[data-lang-toggle]').forEach(el => {
    el.textContent = lang === 'id' ? 'EN' : 'ID'
    el.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia')
  })
  // Update WA links
  const waText = translations[lang].wa_text
  document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach(el => {
    el.href = el.href.replace(/text=[^&]*/, `text=${waText}`)
  })
}

export function applyTranslations(lang: Lang) {
  const t = translations[lang]
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n') as TranslationKey
    if (key && t[key] !== undefined) {
      if (el.tagName === 'DIV' || el.tagName === 'P') {
        el.style.whiteSpace = 'pre-line'
      }
      el.textContent = t[key]
    }
  })
}
