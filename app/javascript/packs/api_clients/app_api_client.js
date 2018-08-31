import http from './http';
import starWarsClient from './starwars_api_client.js';

const client = {
  baseUrl: '/people/',
  appResources: { people: true },
  resourceInApp: function(resource) {
    return (resource in this.appResources);
  }
};

client.getResource = function({ resource, id }) {
  const url = buildUrl({ resource, id });
  if (this.resourceInApp(resource)) return this.getResourceFromApp(url);
  return starWarsClient.getResource({ resource, id });
}

client.getResourceFromApp = function(url) {
  return http.get(url).then((res) => {
    if (res) return res;
    return createPersonFromStarwarsApi(id);
  });
}

client.createPerson = function(person) {
  return http.post(this.baseUrl, person);
}

export default client;

function createPersonFromStarwarsApi(id) {
  return starWarsClient.getPerson(id).then((res) => {
    if (res) return client.createPerson({ ...res, swapi_id: id });
  });
}

function buildUrl({ resource, id }) {
  let url = `/${resource}/`;
  if (id) url += `${id}/`;
  return url;
}
