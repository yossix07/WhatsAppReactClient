const port = 5008;
const urlPrefix = "http://localhost:" + port + "/api";


async function getJsonFromUrl(url) {
  const response =
    await fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json().then(data => (
      {
        data: data,
        status: res.status
      })
    ))

  return response.data;
}

// get the user's contacts
export async function getContactsAsync() {
  const contactsJson = await getJsonFromUrl(urlPrefix + "/contacts");
  console.log(contactsJson);
}

// get the user's contacts
export async function addContactAsync(username, contactUsername ,contactNickname, contactServer) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "myUsername": username, "id": contactUsername, "name": contactNickname, "server": contactServer })
  };
  const response = await fetch(urlPrefix + "/contacts", requestOptions).then(res => res.json().then(data => (
    {
      data: data,
      status: res.status
    })
  ));

  const s = response.status;
  console.log("status is: " + s);
  return s;
}

// sends a new chat invitation
export async function sendChatInvitationAsync(InvitationSender, InvitationReciver, ReciverServer) {
  console.log(InvitationSender);
  console.log(InvitationReciver);
  console.log(ReciverServer);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "from": InvitationSender, "to": InvitationReciver, "server": "localhost" + port })
  };
  const response = await fetch("http://" + ReciverServer + "/api/invitations", requestOptions).then(res => res.json().then(data => (
    {
      data: data,
      status: res.status
    })
  ));

  const s = response.status;
  console.log("status is: " + s);
  return s;
}