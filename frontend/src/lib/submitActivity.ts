const submitActivity = async (
  url: string,
  workspaceId: string,
  itemTitle: string,
  activity: string,
  token: string | null
) => {
  const response = await fetch(`${url}/${workspaceId}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      title: `"${itemTitle}" is ${activity}`
    })
  });

  const body = await response.json();

  return body;
};

export default submitActivity;
