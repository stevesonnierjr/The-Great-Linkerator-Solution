const BASE_URL = "http://localhost:3001/api/";

const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("hit api test", payload);
  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, payload);
  console.log("I AM RESPONSE", response);
  const data = await response.json();
  console.log("I am data: ", data);

  return data;
};

// export const addOneToClickCount = async (linkId, currentClickCount) =>{
//   const body = {
//     clickCount: currentClickCount + 1
//   };
//   const endpoint = `links/${linkId}`;
//   console.log("I am clickCount body: ", body);
//   console.log("I am enpoint: ", endpoint)

//   hitAPI('PATCH', `links/${linkId}`, body).then((data) => {
//     console.log("I am clickCount data: ", data);
//     return data;
//   }).catch(console.error);
// };

export default hitAPI;
