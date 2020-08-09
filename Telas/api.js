const baseUrl = "http://localhost:8080"

const api = (url) => {
  return fetch(baseUrl + url, { mode:'cors', method: 'GET' });
}