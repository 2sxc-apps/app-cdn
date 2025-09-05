document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("#custom-purge");
  e && e.addEventListener("click", function() {
    const t = document.querySelector("#custom-purge-url").value;
    n(t);
  });
  const r = document.querySelector("#full-purge");
  r && r.addEventListener("click", function() {
    n();
  });
  const u = document.querySelector("#tag-purge");
  u && u.addEventListener("click", function() {
    const t = document.querySelector("#tag-purge-url").value;
    t.trim() !== "" ? n("", t) : alert("Please enter at least one tag to purge.");
  });
});
function n(e = "", r = "") {
  if (!(!r && (!e || e.trim() === "") && !confirm("You are about to purge the entire cache. Are you sure?"))) {
    var u = $2sxc(6923), t = {}, o = {
      flushUrl: e,
      tags: r
    };
    u.webApi.post("app/auto/api/Cache/Purge", t, o).then((c) => {
      console.log(c);
    });
  }
}
