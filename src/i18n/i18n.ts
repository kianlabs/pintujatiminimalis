import { translations, type Lang, type TranslationKey } from './translations'

export function getLang(): Lang {
  if (typeof localStorage === 'undefined') return 'id'
  return (localStorage.getItem('lang') as Lang) || 'id'
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
      // Support newlines
      if (el.tagName === 'DIV' || el.tagName === 'P') {
        el.style.whiteSpace = 'pre-line'
      }
      el.textContent = t[key]
    }
  })
}

export function initI18n() {
  const lang = getLang()
  // Apply translations once
  applyTranslations(lang)
  // Set toggle button text
  document.querySelectorAll<HTMLElement>('[data-lang-toggle]').forEach(el => {
    el.textContent = lang === 'id' ? 'EN' : 'ID'
    el.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia')
    el.addEventListener('click', () => {
      const current = getLang()
      setLang(current === 'id' ? 'en' : 'id')
    })
  })
}
