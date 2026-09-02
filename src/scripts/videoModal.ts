import { gsap } from 'gsap'

export function initVideoModal() {
  const modal = document.getElementById('video-modal')
  const modalVideo = document.getElementById('modal-video') as HTMLVideoElement
  const modalClose = document.getElementById('modal-close')
  const modalPrev = document.getElementById('modal-prev')
  const modalNext = document.getElementById('modal-next')
  const modalCounter = document.getElementById('modal-counter')
  const allCards = document.querySelectorAll<HTMLButtonElement>('.video-card')
  let currentIdx = 0

  function getVisibleCards(): HTMLButtonElement[] {
    return Array.from(allCards).filter(c => !c.classList.contains('hidden'))
  }

  function openModal(idx: number) {
    currentIdx = idx
    const src = allCards[idx].dataset.src || ''
    modalVideo!.src = src
    modalVideo!.load()
    modalVideo!.play()
    const visible = getVisibleCards()
    const visiblePos = visible.findIndex(c => c.dataset.idx === String(idx))
    modalCounter!.textContent = `${visiblePos + 1} / ${visible.length}`
    modal!.classList.remove('hidden')
    modal!.classList.add('flex')
    document.body.style.overflow = 'hidden'
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
    const currentVisibleIdx = visible.findIndex(c => c.dataset.idx === String(currentIdx))
    const nextVisibleIdx = (currentVisibleIdx + dir + visible.length) % visible.length
    const nextCard = visible[nextVisibleIdx]
    openModal(Number(nextCard.dataset.idx))
  }

  allCards.forEach((card, idx) => {
    card.addEventListener('click', () => openModal(idx))
  })

  modalClose?.addEventListener('click', closeModal)
  modalPrev?.addEventListener('click', () => navigate(-1))
  modalNext?.addEventListener('click', () => navigate(1))
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal() })

  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('flex')) return
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowLeft') navigate(-1)
    if (e.key === 'ArrowRight') navigate(1)
  })
}

export function initLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-btn')
  const loadMoreWrap = document.getElementById('load-more-wrap')
  const hiddenCards = document.querySelectorAll<HTMLButtonElement>('.video-card.hidden')

  loadMoreBtn?.addEventListener('click', () => {
    hiddenCards.forEach((card, i) => {
      card.classList.remove('hidden')
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: i * 0.03, ease: 'power2.out' })
    })
    loadMoreWrap?.remove()
  })
}
