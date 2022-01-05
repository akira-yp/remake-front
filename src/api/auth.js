export const getAuthDataFromStorage = () => {
  const headers = JSON.parse(localStorage.getItem('headers'))
  return {
    'access-token': headers['access-token'],
    client: headers.client,
    uid: headers.uid,
    'Content-Type': 'application/json'
  }
}
