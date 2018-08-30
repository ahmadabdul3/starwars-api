import http from './http';
import starWarsClient from './starwars_api_client.js';

const client = {
  baseUrl: '/persons/',
};

client.getPerson = function(id) {
  const url = `${this.baseUrl}${id}/`;

  return http.get(url).then((res) => {
    if (res.status === 'success') return res;
    createPersonFromStarwarsApi(id);
  });
}

client.createPerson = function(person) {
  return http.post(this.baseUrl, person);
}

export default client;

function createPersonFromStarwarsApi(id) {
  return starWarsClient.getPerson(id).then((person) => {
    console.log(person);
    return client.createPerson({ ...person, swapi_id: id });
  });
}
