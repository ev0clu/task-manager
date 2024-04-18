const fetchAllByItemId = async <T>(
  url: string,
  id: string | undefined,
  item: string,
  token: string | null
): Promise<T> => {
  const response = await fetch(`${url}/${id}/${item}`, {
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

export default fetchAllByItemId;
