document.addEventListener('DOMContentLoaded', () => {
  const customPurgeBtn = document.querySelector('#custom-purge');
  if (customPurgeBtn) {
    customPurgeBtn.addEventListener('click', function () {
      const customUrl = (document.querySelector('#custom-purge-url') as HTMLInputElement).value;
      purgeCache(customUrl);
    });
  }

  const fullPurgeBtn = document.querySelector('#full-purge');
  if (fullPurgeBtn) {
    fullPurgeBtn.addEventListener('click', function () {
      purgeCache();
    });
  }

  const tagPurgeBtn = document.querySelector('#tag-purge');
  if (tagPurgeBtn) {
    tagPurgeBtn.addEventListener('click', function () {
      const tags = (document.querySelector('#tag-purge-url') as HTMLInputElement).value;
      if (tags.trim() !== '') {
        purgeCache('', tags);
      } else {
        alert('Please enter at least one tag to purge.');
      }
    });
  }
});

function purgeCache(url = '', tags = '') {
  if (!tags && (!url || url.trim() === '')) {
    if (!confirm('You are about to purge the entire cache. Are you sure?')) return;
  }

  var sxc = ($2sxc as any)(6923);
  var urlParams = {};
  var postParams = {
    flushUrl: url,
    tags: tags,
  };

  sxc.webApi.post('app/auto/api/Cache/Purge', urlParams, postParams).then((data: any) => {
    var jsonData = JSON.parse(data);
    if (jsonData.success) alert('Purge successful!');
  });
}

let header = '';
let cacheTag = '';
let isEnabled = false;
let serverTime = '';

function initCacheStatus(enabled, hdr, tag, srvTime) {
  isEnabled = enabled;
  header = hdr;
  cacheTag = tag;
  serverTime = srvTime;

  showCacheInfo(window.location.hash === '#cachedebug');
}

async function getCacheStatus(url) {
  try {
    const res = await fetch(url, { method: 'GET', cache: 'reload' });
    const cf = res.headers.get('cf-cache-status') || 'missing';
    const cc = res.headers.get('cache-control') || 'missing';
    const isPublic = cc.toLowerCase().includes('public');
    return { cf, cc, isPublic };
  } catch {
    return { cf: 'Error loading', cc: 'Error loading', isPublic: false };
  }
}

function formatCacheStatus(results, isEnabled, header, cacheTag, serverTime) {
  const cacheTypes = ['HTML', 'JS', 'CSS', 'IMG'];
  const lines = cacheTypes.map((type, i) => {
    const { cf, cc, isPublic } = results[i] || {};
    return `${type}: CF=${cf}, CC=${cc}, ${isPublic ? '✅ public' : '❌ not public'}`;
  });

  const browserTime = new Date().toLocaleString('de-DE', { hour12: false });
  const isEnabledText = isEnabled ? 'enabled' : 'disabled';

  return `Cache Status: ${isEnabledText}\n` + `Cache-Control: ${header}\n` + `Cache-Tag: ${cacheTag}\n` + `Server-Zeit: ${serverTime} Browser-Zeit: ${browserTime}\n` + lines.join('\n');
}

async function showCacheInfo(debug = false) {
  const targets = [
    { selector: window.location.href, prop: null, id: 'cf-status-html' },
    { selector: 'script[src]', prop: 'src', id: 'cf-status-js' },
    { selector: 'link[rel="stylesheet"][href]', prop: 'href', id: 'cf-status-css' },
    { selector: 'img[src]', prop: 'src', id: 'cf-status-img' },
  ];

  const results = await Promise.all(
    targets.map(async ({ selector, prop }) => {
      if (prop === null) return getCacheStatus(selector);
      const el = document.querySelector(selector);
      return el ? getCacheStatus(el[prop]) : { cf: 'missing', cc: 'missing', isPublic: false };
    })
  );

  const statusText = formatCacheStatus(results, isEnabled, header, cacheTag, serverTime);

  if (debug) {
    alert(statusText);
  } else {
    const statsEl = document.querySelector('#app-stats');
    if (statsEl) statsEl.value = statusText;
  }
}

(window as any).initCacheStatus = initCacheStatus;
