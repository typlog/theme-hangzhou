/**
 * @param {HTMLButtonElement} button
 */
function updateSidebarTrigger(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    const expanded = button.getAttribute('aria-expanded')
    if (expanded === 'true') {
      button.setAttribute('aria-expanded', 'false')
    } else {
      button.setAttribute('aria-expanded', 'true')
    }
  })
}

function expandActiveSidebar() {
  const el = document.querySelector('.sidebar-item.active')
  if (el) {
    const trigger = el.parentNode.parentNode.querySelector('.sidebar-items-trigger')
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true')
    }
  }
}

const LINK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>'

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

/**
 * @param {HTMLDivElement} div
 */
function updateOutline(div) {
  const levels = div.getAttribute('data-levels') || '2,3'
  const selectors = levels.split(',').map(i => `h${i}`).join(',')

  /** @type {NodeListOf<HTMLElement>} */
  const elements = document.querySelectorAll(`.e-content :where(${selectors})`)
  const outline = [...elements].map((el) => {
    const data = resolveHeading(el)
    return `<li class="level-${data.level}"><a href="#${data.id}">${data.title}</a></li>`
  }).join('')
  div.innerHTML = `<ul>${outline}</ul>`
}

const sidebarButtons = document.querySelectorAll('.sidebar-items-trigger')
for (let i = 0; i < sidebarButtons.length; i++) {
  updateSidebarTrigger(sidebarButtons[i])
}

const outlineDivs = document.querySelectorAll('.js-outline')
for (let i = 0; i < outlineDivs.length; i++) {
  updateOutline(outlineDivs[i])
}

expandActiveSidebar()
