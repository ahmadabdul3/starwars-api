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

// - defer all 'index' requests - ie. requests without an id -
//   to SWAPI
// - this will keep this code simpler - otherwise I have to
//   keep track of how many items I've cached, and compare that
//   with how many there are total at SWAPI - and do some
//   conditional logic to hit this app's API vs SWAPI
client.getAll = function({ resource }) {
  if (this.isValidResource(resource)) {
    const fullUrl = `${this.baseUrl}${resource}/`;
    return http.get(fullUrl);
  }

  return new Promise((resolve, reject) => reject(`invalid resource: '${resource}'`));
}

client.getResource = function({ resource, id }) {
  if (this.isValidResource(resource)) {
    const fullUrl = `${this.baseUrl}${resource}/${id}/`;
    return http.get(fullUrl);
  }

  return new Promise((resolve, reject) => reject(`invalid resource: '${resource}'`));
}

export default client;
