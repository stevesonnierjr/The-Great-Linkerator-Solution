const BASE_URL = 'http://localhost:3001/api/';

const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('hit api test', bodyObj);
  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, payload);
  console.log('I AM RESPONSE', response);
  const data = await response.json();

  return data;
};

export default hitAPI;
