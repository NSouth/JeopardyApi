const MakeGetRequest = async (url, headers) => {
  const result = await fetch(url, {
    headers: headers,
  });
  return await result.json();
};

export default MakeGetRequest;
