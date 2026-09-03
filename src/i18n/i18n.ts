import { translations, type Lang, type TranslationKey } from './translations'

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'id'
  try {
    const stored = window.localStorage.getItem('lang') as Lang | null
    if (stored === 'id' || stored === 'en') return stored
  } catch {
    // storage unavailable (private mode, cookies blocked) — fall through
  }
  const pageLang = document.documentElement.lang as Lang
  return pageLang === 'en' ? 'en' : 'id'
}

export function updateWaLinks(lang: Lang) {
  const waText = translations[lang].wa_text
  document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach(el => {
    const href = el.getAttribute('href')
    if (!href || !href.includes('text=')) return
    el.setAttribute('href', href.replace(/text=[^&]*/, `text=${waText}`))
  })
}

function syncToggleButtons(lang: Lang) {
  document.querySelectorAll<HTMLElement>('[data-lang-toggle]').forEach(el => {
    el.textContent = lang === 'id' ? 'EN' : 'ID'
    el.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia')
  })
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem('lang', lang)
  } catch {
    // ignore write failures (private mode)
  }
  document.documentElement.lang = lang
  applyTranslations(lang)
}

export function applyTranslations(lang: Lang) {
  const t = translations[lang]
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n') as TranslationKey | null
    if (key && t[key] !== undefined) {
      if (el.tagName === 'DIV' || el.tagName === 'P') {
        el.style.whiteSpace = 'pre-line'
      }
      el.textContent = t[key]
    }
  })
  updateWaLinks(lang)
  syncToggleButtons(lang)
}
