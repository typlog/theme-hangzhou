const LINK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>'
const navHeight = document.querySelector('#nav-columns') ? 112 : 64
const outline = resolveOutline()
const containers = document.querySelectorAll('.js-outline')

/**
 * @param {HTMLElement} el
 */
function resolveHeading (el) {
  const level = Number(el.tagName[1])
  const title = el.textContent
  if (el.id) {
    return {level, title, id: el.id}
  }

  const id = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-')).replaceAll('%', '-').replace(/^-/, '')
  el.id = id
  const anchor = document.createElement('a')
  anchor.className = 'heading-anchor'
  anchor.href = '#' + id
  anchor.setAttribute('aria-label', `Permalink to "${title}"`)
  anchor.innerHTML = '<span class="anchor-icon">' + LINK_ICON + '</span>'
  el.appendChild(anchor)
  return {level, title, id}
}

function resolveOutline () {
  const elements = document.querySelectorAll('.e-content :where(h2, h3)')
  return [...elements].map((el) => {
    const data = resolveHeading(el)
    return {...data, el}
  })
}

/**
 * @param {string} id
 */
function setActiveOutline (id) {
  const activeLinks = document.querySelectorAll(`li > a[href="#${id}"]`)
  activeLinks.forEach(el => {
    el.parentNode.parentNode.childNodes.forEach(li => {
      li.classList.remove('active')
    })
    el.parentNode.classList.add('active')
  })

  const index = outline.findIndex(item => item.id === id)
  const aside = document.querySelector('#aside')
  if (aside) {
    aside.setAttribute('style', `--active-index: ${index}`)
  }
}

/**
 * @param {string} hash
 */
function scrollToHashHeading (hash) {
  const heading = document.querySelector(hash)
  if (!heading) return

  const elementPosition = heading.getBoundingClientRect().top
  const offsetPosition = window.scrollY + elementPosition - navHeight
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

if (outline.length && location.hash) {
  scrollToHashHeading(location.hash)
}

if (outline.length && containers.length) {
  const tocLis = outline.map(data => {
    return `<li class="level-${data.level}"><a href="#${data.id}">${data.title}</a></li>`
  }).join('')

  containers.forEach(el => {
    const tocUl = document.createElement('ul')
    tocUl.innerHTML = tocLis
    el.appendChild(tocUl)
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveOutline(entry.target.id)
      }
    })
  }, {
    root: null,
    rootMargin: `-${navHeight}px 0px -80% 0px`,
    threshold: 0
  })

  outline.forEach(item => {
    observer.observe(item.el)
  })
}
