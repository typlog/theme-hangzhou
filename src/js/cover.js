/** @param {HTMLDivElement} element */
function replaceCover(element) {
  let src = element.getAttribute('data-src')
  if (!src) {
    src = element.getAttribute('data-cover')
  }
  let style = 'background-image:url(' + src + ')'
  const width = element.getAttribute('data-width')
  const height = element.getAttribute('data-height')
  if (width && height) {
    const padding = parseInt(height, 10) * 100 / parseInt(width, 10) + 'vw';
    style += ';height:' + padding
  }
  element.setAttribute('style', style)
}

const els = document.querySelectorAll('.js-cover')
if ("IntersectionObserver" in window) {
  let lazyObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        replaceCover(entry.target)
        lazyObserver.unobserve(entry.target)
      }
    })
  })
  for (let i = 0; i < els.length; i++) {
    lazyObserver.observe(els[i])
  }
} else {
  for (let i = 0; i < els.length; i++) {
    replaceCover(els[i])
  }
}
