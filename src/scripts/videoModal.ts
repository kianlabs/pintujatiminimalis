import { gsap } from 'gsap'

export interface VideoModalConfig {
  cardSelector: string
  modalId: string
  videoId: string
  closeId: string
  prevId: string
  nextId: string
  counterId: string
  counterPrefix?: string
}

export function createVideoModal(cfg: VideoModalConfig) {
  const modal = document.getElementById(cfg.modalId)
  const modalVideo = document.getElementById(cfg.videoId) as HTMLVideoElement
  const modalClose = document.getElementById(cfg.closeId)
  const modalPrev = document.getElementById(cfg.prevId)
  const modalNext = document.getElementById(cfg.nextId)
  const modalCounter = document.getElementById(cfg.counterId)
  const cards = document.querySelectorAll<HTMLButtonElement>(cfg.cardSelector)
  let currentIdx = 0

  function getVisibleCards(): HTMLButtonElement[] {
    return Array.from(cards).filter(c => !c.classList.contains('hidden'))
  }

  function openModal(idx: number) {
    currentIdx = idx
    modalVideo!.src = cards[idx].dataset.src || ''
    const visible = getVisibleCards()
    const visiblePos = visible.findIndex(c => c.dataset.idx === String(idx))
    const prefix = cfg.counterPrefix ? `${cfg.counterPrefix} ` : ''
    modalCounter!.textContent = `${prefix}${visiblePos + 1} / ${visible.length}`
    modal!.classList.remove('hidden')
    modal!.classList.add('flex')
    document.body.style.overflow = 'hidden'
    // Load & play safely once metadata available, ignoring autoplay rejections
    modalVideo!.load()
    modalVideo!.play().catch(() => {})
  }

  function closeModal() {
    modalVideo!.pause()
    modalVideo!.src = ''
    modal!.classList.add('hidden')
    modal!.classList.remove('flex')
    document.body.style.overflow = ''
  }

  function navigate(dir: number) {
    const visible = getVisibleCards()
    const visiblePos = visible.findIndex(c => c.dataset.idx === String(currentIdx))
    const nextPos = (visiblePos + dir + visible.length) % visible.length
    const nextCard = visible[nextPos]
    if (nextCard) {
      openModal(Number(nextCard.dataset.idx))
    }
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => openModal(idx))
  })
  modalClose?.addEventListener('click', closeModal)
  modalPrev?.addEventListener('click', () => navigate(-1))
  modalNext?.addEventListener('click', () => navigate(1))
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('flex')) return
    if (e.key === 'Escape') closeModal()
    else if (e.key === 'ArrowLeft') navigate(-1)
    else if (e.key === 'ArrowRight') navigate(1)
  })
}

export function initLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-btn')
  const loadMoreWrap = document.getElementById('load-more-wrap')
  const hiddenCards = document.querySelectorAll<HTMLButtonElement>('.video-card.hidden')

  loadMoreBtn?.addEventListener('click', () => {
    hiddenCards.forEach((card, i) => {
      card.classList.remove('hidden')
      gsap.fromTo(card, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.4, delay: i * 0.03, ease: 'power2.out'
      })
    })
    loadMoreWrap?.remove()
  })
}
