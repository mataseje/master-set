export async function getRequest(url, token){
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + token,
    },
  });

  return response;
}

export async function postRequest(url, token, body){
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body)
  });

return response;
}

export async function deleteRequest(url, token, body){
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body)
  });

return response;
}