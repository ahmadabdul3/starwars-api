import http from './http';

const client = {
  baseUrl: 'https://swapi.co/api/',
  validResources: {
    root: true,
    people: true,
    films: true,
    starships: true,
    vehicles: true,
    species: true,
    planets: true,
  },
  isValidResource: function(resource) {
    return (resource in this.validResources);
  },
};

client.getResource = function({ resource, id }) {
  if (this.isValidResource(resource)) {
    const fullUrl = `${this.baseUrl}${resource}/${id}/`;
    return http.get(fullUrl);
  }

  return new Promise((resolve, reject) => reject(`invalid resource: '${resource}'`));
}

client.getResourceWithFullUrl = function(url) {

}

export default client;
