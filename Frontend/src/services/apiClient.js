export async function apiFetch(url, options = {}) {
  const { headers, ...restOptions } = options;

  return fetch(url, {
    ...restOptions,
    headers: {
      Accept: 'application/json',
      ...headers
    }
  });
}