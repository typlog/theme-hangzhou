const SOCIAL_LINKS = {
  x: 'https://x.com/intent/post?text={t}&url={u}',
  bluesky: 'https://bsky.app/intent/compose?text={t}',
  facebook: 'http://www.facebook.com/sharer.php?u={u}',
  weibo: 'http://service.weibo.com/share/share.php?title={t}&url={u}',
  telegram: 'https://telegram.me/share/url?text={t}&url={u}',
}

const closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1" d="M18 6L6 18M6 6l12 12"></path></svg>`

function showWechat(link) {
  let element = document.querySelector('#wechat-share')
  if (element) {
    return element.classList.add('show')
  }

  element = document.createElement('div')
  element.id = 'wechat-share'
  element.classList.add('show')

  const closeButton = document.createElement('button')
  closeButton.innerHTML = closeSvg
  closeButton.addEventListener('click', () => {
    element.classList.remove('show')
  })
  element.appendChild(closeButton)

  const container = document.createElement('div')
  element.appendChild(container)

  import('https://esm.sh/uqr').then(({ renderSVG }) => {
    container.innerHTML = '<h3>扫描二维码分享到微信</h3>' + renderSVG(link)
  })

  document.body.appendChild(element)
}

function sharePost(el) {
  const title = document.querySelector('meta[property="og:title"]').getAttribute('content')
  const link = document.querySelector('link[rel="canonical"]').getAttribute('href')
  el.addEventListener('click', function(e) {
    e.preventDefault()
    const type = el.getAttribute('data-type')
    if (type === 'wechat') {
      return showWechat(link)
    }
    let url = SOCIAL_LINKS[type]
    if (type === 'bluesky') {
      url = url.replace('{t}', encodeURIComponent(title + ' ' + link))
    } else {
      url = url.replace('{t}', encodeURIComponent(title)).replace('{u}', encodeURIComponent(link))
    }
    window.open(url, '_blank', 'width=615,height=505')
  })
}

const links = document.querySelectorAll('a.js-share')
for (let i = 0; i < links.length; i++) {
  sharePost(links[i])
}
