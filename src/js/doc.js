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

const sidebarButtons = document.querySelectorAll('.sidebar-items-trigger')
for (let i = 0; i < sidebarButtons.length; i++) {
  updateSidebarTrigger(sidebarButtons[i])
}

expandActiveSidebar()
