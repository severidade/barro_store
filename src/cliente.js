import { sanityClient } from '@sanity/client';

export default sanityClient({
  projectId: 'knnk47g7',
  dataset: 'production',
  // as informações acima estão no arquivo sanity.cli.js
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: '2023-04-28', // use current date (YYYY-MM-DD) to target the latest API version
});
