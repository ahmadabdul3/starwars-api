import http from './http';

const client = {
  baseUrl: 'https://swapi.co/api/',
  peopleResource: 'people',
};

client.getPerson = function(id) {
  const { baseUrl, peopleResource } = this;
  const url = `${baseUrl}${peopleResource}/${id}/`;
  return http.get(url);
}

export default client;
