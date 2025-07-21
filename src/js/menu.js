function toggleMenu(button) {
  const id = button.getAttribute('aria-controls')
  const ctrl = document.getElementById(id)
  const expanded = 'data-expanded-' + id
  button.addEventListener('click', function () {
    if (document.body.hasAttribute(expanded)) {
      document.body.removeAttribute(expanded)
      ctrl.setAttribute('aria-hidden', 'true')
      setButtonExpanded(id, 'false')
    } else {
      document.body.setAttribute(expanded, "true")
      ctrl.setAttribute('aria-hidden', 'false')
      setButtonExpanded(id, 'true')
    }
  })
}

function setButtonExpanded(id, value) {
  const els = document.querySelectorAll('[aria-controls="' + id + '"]')
  for (let i = 0; i < els.length; i++) {
    els[i].setAttribute('aria-expanded', value)
  }
}

const menuButtons = document.querySelectorAll('button[aria-controls]')
for (let i = 0; i < menuButtons.length; i++) {
  toggleMenu(menuButtons[i])
}
