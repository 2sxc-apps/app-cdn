import Cloudflare from 'cloudflare';

const client = new Cloudflare({
  apiToken: 'Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY',
});

const response = await client.cache.purge({ zone_id: '023e105f4ecef8ad9ca31a8372d0c353' });

console.log(response.id);
