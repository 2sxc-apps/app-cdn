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
    apiToken: 'vLtFl8vyItbpQ4C6movhylmkeQ-oO28gBsTFDN6u', // Use 'token' property, not 'apiToken'
  });

  // Replace with your actual zone ID
  const zoneId = '4413b9853bf2627723add7e259356e72';

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
