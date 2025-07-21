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

/**
 * @param {HTMLDivElement} div
 * @returns
 */
function updateOutline(div) {
  const levels = div.getAttribute('data-levels') || '2,3'
  const selectors = levels.split(',').map(i => `h${i}`).join(',')

  /** @type {NodeListOf<HTMLElement>} */
  const elements = document.querySelectorAll(`.e-content :where(${selectors})`)
  const outline = [...elements].map((el) => {
    const level = Number(el.tagName[1])
    const title = el.textContent
    const id = 'anchor' + encodeURIComponent(title).replaceAll('%', '-')
    el.id = id
    return `<li class="level-${level}"><a href="#${id}">${title}</a></li>`
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
