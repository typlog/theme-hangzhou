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

if (outline.length && containers.length) {
  const tocLis = outline.map(data => {
    return `<li class="level-${data.level}"><a href="#${data.id}">${data.title}</a></li>`
  }).join('')
  const tocUl = document.createElement('ul')
  tocUl.innerHTML = tocLis
  for (let i = 0; i < containers.length; i++) {
    containers[i].appendChild(tocUl)
  }

  function updateActiveOutline (id) {
    const index = outline.findIndex(item => item.id === id)
    containers.forEach(el => {
      el.setAttribute('style', `--active-index: ${index}`)
    })

    const lis = tocUl.querySelectorAll('li')
    lis.forEach(li => {
      li.classList.remove('active')
    })
    const activeLi = lis[index]
    if (activeLi) {
      activeLi.classList.add('active')
      if (activeLi.scrollIntoViewIfNeeded) {
        activeLi.scrollIntoViewIfNeeded()
      }
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveOutline(entry.target.id)
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
