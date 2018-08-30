import http from './http';
import starWarsClient from './starwars_api_client.js';

const client = {
  baseUrl: '/people/',
};

client.getPerson = function(id) {
  const url = `${this.baseUrl}${id}/`;

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
