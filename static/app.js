const s = ["auto", "light", "dark"], l = document.querySelector(".js-theme");
function A() {
  let e = b();
  e += 1, s[e] || (e = 0);
  const t = s[e];
  setColorMode(t), sessionStorage._theme = t, v(t);
}
function b() {
  return s.indexOf(document.documentElement.getAttribute("data-color-mode") || "auto");
}
function v(e) {
  const t = l.getAttribute("data-aria-" + e);
  l.setAttribute("aria-label", t);
}
l && (l.addEventListener("click", (e) => {
  e.stopPropagation(), A();
}), v(s[b()] || "auto"));
function y(e) {
  const t = e.getAttribute("aria-controls"), n = document.getElementById(t);
  n && (n.addEventListener("click", (o) => {
    o.stopPropagation();
  }), e.addEventListener("click", (o) => {
    o.stopPropagation();
    const r = w(), i = r.indexOf(t);
    n.getAttribute("aria-hidden") === "false" ? (r.splice(i, 1), document.body.setAttribute("data-expanded", r.join(" ")), n.setAttribute("aria-hidden", "true"), d(t, "false")) : (r.push(t), document.body.setAttribute("data-expanded", r.join(" ")), n.setAttribute("aria-hidden", "false"), d(t, "true"));
  }));
}
function d(e, t) {
  const n = document.querySelectorAll('[aria-controls="' + e + '"]');
  for (let o = 0; o < n.length; o++)
    n[o].setAttribute("aria-expanded", t);
}
function w() {
  const e = document.body.getAttribute("data-expanded") || "";
  return e.trim() ? e.split(/\s+/) : [];
}
const u = document.querySelectorAll(".js-menu");
for (let e = 0; e < u.length; e++)
  y(u[e]);
document.body.addEventListener("click", () => {
  const e = w();
  document.body.setAttribute("data-expanded", ""), e.forEach((t) => {
    document.getElementById(t).setAttribute("aria-hidden", "true"), d(t, "false");
  });
});
function k(e) {
  e.addEventListener("click", (t) => {
    t.preventDefault(), e.getAttribute("aria-expanded") === "true" ? e.setAttribute("aria-expanded", "false") : e.setAttribute("aria-expanded", "true");
  });
}
function E() {
  const e = document.querySelector(".sidebar-item.active");
  if (e) {
    const t = e.parentNode.parentNode.querySelector(".sidebar-items-trigger");
    t && t.setAttribute("aria-expanded", "true");
  }
}
const h = document.querySelectorAll(".sidebar-items-trigger");
for (let e = 0; e < h.length; e++)
  k(h[e]);
E();
const L = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>', x = document.querySelector("#nav-columns") ? 112 : 64, c = C(), p = document.querySelectorAll(".js-outline");
function S(e) {
  const t = Number(e.tagName[1]), n = e.textContent;
  if (e.id)
    return { level: t, title: n, id: e.id };
  const o = encodeURIComponent(n.toLowerCase().replace(/\s+/g, "-")).replaceAll("%", "-").replace(/^-/, "");
  e.id = o;
  const r = document.createElement("a");
  return r.className = "heading-anchor", r.href = "#" + o, r.setAttribute("aria-label", `Permalink to "${n}"`), r.innerHTML = '<span class="anchor-icon">' + L + "</span>", e.appendChild(r), { level: t, title: n, id: o };
}
function C() {
  return [...document.querySelectorAll(".e-content :where(h2, h3)")].map((t) => ({ ...S(t), el: t }));
}
function I(e) {
  document.querySelectorAll(`li > a[href="#${e}"]`).forEach((r) => {
    r.parentNode.parentNode.childNodes.forEach((i) => {
      i.classList.remove("active");
    }), r.parentNode.classList.add("active");
  });
  const n = c.findIndex((r) => r.id === e), o = document.querySelector("#aside");
  o && o.setAttribute("style", `--active-index: ${n}`);
}
function q(e) {
  const t = document.querySelector(e);
  if (!t) return;
  const n = t.getBoundingClientRect().top, o = window.scrollY + n - x;
  window.scrollTo({
    top: o,
    behavior: "smooth"
  });
}
c.length && location.hash && q(location.hash);
if (c.length && p.length) {
  const e = c.map((n) => `<li class="level-${n.level}"><a href="#${n.id}">${n.title}</a></li>`).join("");
  p.forEach((n) => {
    const o = document.createElement("ul");
    o.innerHTML = e, n.appendChild(o);
  });
  const t = new IntersectionObserver((n) => {
    n.forEach((o) => {
      o.isIntersecting && I(o.target.id);
    });
  }, {
    root: null,
    rootMargin: `-${x}px 0px -80% 0px`,
    threshold: 0
  });
  c.forEach((n) => {
    t.observe(n.el);
  });
}
const m = document.querySelectorAll("time.dt-published"), M = document.documentElement.lang;
function O(e) {
  const t = e.getAttribute("datetime"), n = new Date(t), o = Intl.DateTimeFormat(M, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  e.textContent = o.format(n);
}
for (let e = 0; e < m.length; e++)
  O(m[e]);
function g(e) {
  let t = e.getAttribute("data-src");
  t || (t = e.getAttribute("data-cover"));
  let n = "background-image:url(" + t + ")";
  const o = e.getAttribute("data-width"), r = e.getAttribute("data-height");
  if (o && r) {
    const i = parseInt(r, 10) * 100 / parseInt(o, 10) + "vw";
    n += ";height:" + i;
  }
  e.setAttribute("style", n);
}
const a = document.querySelectorAll(".js-cover");
if ("IntersectionObserver" in window) {
  let e = new IntersectionObserver(function(t, n) {
    t.forEach(function(o) {
      o.isIntersecting && (g(o.target), e.unobserve(o.target));
    });
  });
  for (let t = 0; t < a.length; t++)
    e.observe(a[t]);
} else
  for (let e = 0; e < a.length; e++)
    g(a[e]);
const N = {
  x: "https://x.com/intent/post?text={t}&url={u}",
  bluesky: "https://bsky.app/intent/compose?text={t}",
  facebook: "http://www.facebook.com/sharer.php?u={u}",
  weibo: "http://service.weibo.com/share/share.php?title={t}&url={u}",
  telegram: "https://telegram.me/share/url?text={t}&url={u}"
}, B = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1" d="M18 6L6 18M6 6l12 12"></path></svg>';
function j(e) {
  let t = document.querySelector("#wechat-share");
  if (t)
    return t.classList.add("show");
  t = document.createElement("div"), t.id = "wechat-share", t.classList.add("show");
  const n = document.createElement("button");
  n.innerHTML = B, n.addEventListener("click", () => {
    t.classList.remove("show");
  }), t.appendChild(n);
  const o = document.createElement("div");
  t.appendChild(o), import("https://esm.sh/uqr").then(({ renderSVG: r }) => {
    o.innerHTML = "<h3>扫描二维码分享到微信</h3>" + r(e);
  }), document.body.appendChild(t);
}
function H(e) {
  const t = document.querySelector('meta[property="og:title"]').getAttribute("content"), n = document.querySelector('link[rel="canonical"]').getAttribute("href");
  e.addEventListener("click", function(o) {
    o.preventDefault();
    const r = e.getAttribute("data-type");
    if (r === "wechat")
      return j(n);
    let i = N[r];
    r === "bluesky" ? i = i.replace("{t}", encodeURIComponent(t + " " + n)) : i = i.replace("{t}", encodeURIComponent(t)).replace("{u}", encodeURIComponent(n)), window.open(i, "_blank", "width=615,height=505");
  });
}
const f = document.querySelectorAll("a.js-share");
for (let e = 0; e < f.length; e++)
  H(f[e]);
