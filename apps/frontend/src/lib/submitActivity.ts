const submitActivity = async (
  url: string,
  workspaceId: string,
  itemTitle: string,
  item: string,
  activity: string,
  accessT: string | null
) => {
  const response = await fetch(`${url}/${workspaceId}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessT
    },
    body: JSON.stringify({
      title: `"${itemTitle}" ${item} is ${activity}`
    })
  });

  const body = await response.json();

  return body;
};

export default submitActivity;
