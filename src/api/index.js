const BASE_URL = "https://loving-swanson-c36482.netlify.app//api/";

const hitAPI = async (method, endpoint, bodyObj) => {
  console.log("sending ", method, " request");
  const payload = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, payload);
  const data = await response.json();

  return data;
};

export default hitAPI;
