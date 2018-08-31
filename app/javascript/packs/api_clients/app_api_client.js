import http from './http';
import starWarsClient from './starwars_api_client.js';

const client = {
  validResources: { people: true, species: true },
  isValidResource: function(resource) {
    return (resource in this.validResources);
  },
};

client.getResource = function({ resource, id }) {
  if (this.isValidResource(resource)) return this.getResourceFromApp({ resource, id });
  return starWarsClient.getResource({ resource, id });
}

client.getResourceFromApp = function({ resource, id }) {
  let url = `/${resource}/`;
  if (id) url += `${id}/`;

  return http.get(url).then((res) => {
    if (res) return res;
    return createResourceFromStarwarsApi({ resource, id });
  });
}

client.createResource = function({ resource, attributes }) {
  const url = '/' + resource;
  return http.post(url, attributes);
}

export default client;

function createResourceFromStarwarsApi({ resource, id }) {
  return starWarsClient.getResource({ resource, id }).then((res) => {
    if (!res) return;
    const attributes = { ...res, swapi_id: id };
    return client.createResource({ resource, attributes });
  });
}
