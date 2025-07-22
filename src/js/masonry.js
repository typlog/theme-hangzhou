/* post cards masonry */

/**
 *
 * @param {HTMLElement} el
 */
function updatePostCard (el) {
  const area = Math.ceil((el.clientHeight + 14) / 24)
  el.setAttribute('style', `grid-row-end: span ${area}`)
}

const elements = document.querySelectorAll('.js-masonry > a')

if (elements.length) {
  const updateMasonry = () => {
    for (let i = 0; i < elements.length; i++) {
      updatePostCard(elements[i])
    }
  }
  window.addEventListener('DOMContentLoaded', updateMasonry)
  window.addEventListener('resize', updateMasonry)
}
