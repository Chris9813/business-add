const baseUrl = "https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod";

const fetchSinToken = (endPoint, data, method = "GET") => {
  const url = `${baseUrl}/${endPoint}`; //localhost:4000/api/endpoint

  if (method === "GET") {
    return fetch(url, {
      headers: {
        "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchSinToken };
