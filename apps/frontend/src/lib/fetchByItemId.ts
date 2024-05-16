const fetchByItemId = async <T>(
  url: string,
  id: string | undefined,
  token: string | null
): Promise<T> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export default fetchByItemId;
