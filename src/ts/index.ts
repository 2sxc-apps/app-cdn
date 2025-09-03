import Cloudflare from 'cloudflare';

console.log('Cloudflare');

const customPurgeBtn = document.querySelector('#custom-purge');
if (customPurgeBtn) {
  customPurgeBtn.addEventListener('click', function () {
    const customUrl = (document.querySelector('#custom-purge-url') as HTMLInputElement)?.value;
    purgeCache(customUrl);
  });
}

const fullPurgeBtn = document.querySelector('#full-purge');
if (fullPurgeBtn) {
  fullPurgeBtn.addEventListener('click', function () {
    purgeCache();
  });
}

async function purgeCache(flushUrl: string = '') {
  const client = new Cloudflare({
    apiToken: 'Removed', // Use 'token' property, not 'apiToken'
  });

  // Replace with your actual zone ID
  const zoneId = 'Removed';

  let response;

  if (!flushUrl) {
    // Purge everything
    response = await client.cache.purge({ zone_id: zoneId, purge_everything: true });
  } else {
    // Purge specific URL
    response = await client.cache.purge({ zone_id: zoneId, files: [flushUrl] });
  }

  console.log(response);
}
