document.addEventListener("DOMContentLoaded", () => {
  const t = document.querySelector("#custom-purge");
  t && t.addEventListener("click", function() {
    const e = document.querySelector("#custom-purge-url").value;
    o(e);
  });
  const c = document.querySelector("#full-purge");
  c && c.addEventListener("click", function() {
    o();
  });
  const s = document.querySelector("#tag-purge");
  s && s.addEventListener("click", function() {
    const e = document.querySelector("#tag-purge-url").value;
    e.trim() !== "" ? o("", e) : alert("Please enter at least one tag to purge.");
  });
});
function o(t = "", c = "") {
  if (!(!c && (!t || t.trim() === "") && !confirm("You are about to purge the entire cache. Are you sure?"))) {
    var s = $2sxc(6923), e = {}, r = {
      flushUrl: t,
      tags: c
    };
    s.webApi.post("app/auto/api/Cache/Purge", e, r).then((n) => {
      var a = JSON.parse(n);
      a.success && alert("Purge successful!");
    });
  }
}
let i = "", l = "", f = !1, d = "";
function b(t, c, s, e) {
  f = t, i = c, l = s, d = e, w(window.location.hash === "#cachedebug");
}
async function u(t) {
  try {
    const c = await fetch(t, { method: "GET", cache: "reload" }), s = c.headers.get("cf-cache-status") || "missing", e = c.headers.get("cache-control") || "missing", r = e.toLowerCase().includes("public");
    return { cf: s, cc: e, isPublic: r };
  } catch {
    return { cf: "Error loading", cc: "Error loading", isPublic: !1 };
  }
}
function y(t, c, s, e, r) {
  const a = ["HTML", "JS", "CSS", "IMG"].map((g, m) => {
    const { cf: p, cc: S, isPublic: C } = t[m] || {};
    return `${g}: CF=${p}, CC=${S}, ${C ? "✅ public" : "❌ not public"}`;
  }), h = (/* @__PURE__ */ new Date()).toLocaleString("de-DE", { hour12: !1 });
  return `Cache Status: ${c ? "enabled" : "disabled"}
Cache-Control: ${s}
Cache-Tag: ${e}
Server-Zeit: ${r} Browser-Zeit: ${h}
` + a.join(`
`);
}
async function w(t = !1) {
  const c = [
    { selector: window.location.href, prop: null, id: "cf-status-html" },
    { selector: "script[src]", prop: "src", id: "cf-status-js" },
    { selector: 'link[rel="stylesheet"][href]', prop: "href", id: "cf-status-css" },
    { selector: "img[src]", prop: "src", id: "cf-status-img" }
  ], s = await Promise.all(
    c.map(async ({ selector: r, prop: n }) => {
      if (n === null) return u(r);
      const a = document.querySelector(r);
      return a ? u(a[n]) : { cf: "missing", cc: "missing", isPublic: !1 };
    })
  ), e = y(s, f, i, l, d);
  if (t)
    alert(e);
  else {
    const r = document.querySelector("#app-stats");
    r && (r.value = e);
  }
}
window.initCacheStatus = b;
