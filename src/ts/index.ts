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
    console.log(data);
  });
}
