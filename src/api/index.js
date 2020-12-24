const BASE_URL = "http://localhost:3000/api/";

const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, payload)
  
  const data = await response.json();

  return data
}

export default hitAPI;