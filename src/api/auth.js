export const getAuthDataFromStorage = () => {
  const headers = JSON.parse(localStorage.getItem('headers'))
  return {
    'access-token': headers['access-token'],
    client: headers.client,
    // 'expiry': headers.expiry,
    uid: headers.uid,
    'Content-Type': 'application/json'
  }
}
