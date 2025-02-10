import { IEVersion } from './utils'
const isEdge = IEVersion() === 'edge'
const getOffsetTop = (el) => {
  let top = el.offsetTop
  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
  }
  return top
}
const runAnimate = () => {
  const doms = document.querySelectorAll('[hw-animate]')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(item => {
      const { target } = item
      if (item.isIntersecting) {
        const animate = target.getAttribute('hw-animate')
        if (!animate) return observer.unobserve(target)
        const list = animate.split(' ').concat('animated')
        const onEnd = () => target.classList.remove(...list)
        target.classList.add(...list)
        target.removeAttribute('hw-animate')
        target.addEventListener('animationend', onEnd)
        observer.unobserve(target)
      }
    })
  })
  doms.forEach(item => observer.observe(item))
}
const runNavigate = () => {
  const dom = document.querySelector('[hw-navigate]')
  const top = dom.getAttribute('hw-navigate') || 0
  new IntersectionObserver(entries => {
    const { target } = entries[0]
    const dom = target.nextElementSibling
    if (!entries[0].isIntersecting) {
      dom.classList.add('fixed')
    } else {
      dom.classList.remove('fixed')
    }
  }, {
    rootMargin: `${top - 1}px 0px 0px 0px`
  }).observe(dom)
}
const runActive = (offset = 0) => {
  const doms = document.querySelectorAll('[hw-active]')
  const html = document.scrollingElement
  const tops = Array.from(doms)
    .map(dom => ({top: getOffsetTop(dom), id: dom.id}))
    .sort((a, b) => a.top - b.top)
  const height = html.scrollHeight
  return function () {
    const top = html.scrollTop
    tops.forEach(item => {
      if (item.top <= top + offset) {
        this.active = item.id
      }
    })
    if (top + window.innerHeight === height) {
      this.active = tops[tops.length - 1].id
    }
  }
}
const runScroll = function (id, offset = 0) {
  const el = document.getElementById(id)
  const html = document.scrollingElement
  const maxTop = html.scrollHeight - window.innerHeight
  const top = Math.min(maxTop, getOffsetTop(el) - offset)
  isEdge ? window.scrollTo(0, top) : window.scrollTo({top, behavior: 'smooth'})
};

export {
  runAnimate,
  runNavigate,
  runActive,
  runScroll
}