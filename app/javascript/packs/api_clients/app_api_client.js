import http from './http';
import starWarsClient from './starwars_api_client.js';

const client = {
  validResources: { people: true, species: true },
  isValidResource: function(resource) {
    return (resource in this.validResources);
  },
};

client.getResource = function({ resource, id }) {
  if (this.isValidResource(resource)) return getResourceFromApp({ resource, id });
  return starWarsClient.getResource({ resource, id });
}

client.createResource = function({ resource, attributes }) {
  const url = '/' + resource;
  return http.post(url, attributes);
}

export default client;

function getResourceFromApp({ resource, id }) {
  let url = `/${resource}/`;
  if (id) url += `${id}/`;

  return http.get(url).then((res) => {
    return res;
  }).catch((err) => {
    if (err.toString() === 'Error: Not Found') {
      return createResourceFromStarwarsApi({ resource, id });
    }
  });
}

function createResourceFromStarwarsApi({ resource, id }) {
  return starWarsClient.getResource({ resource, id }).then((res) => {
    const attributes = { ...res, swapi_id: id };
    return client.createResource({ resource, attributes });
  });
}
