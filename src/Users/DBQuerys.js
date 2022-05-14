const port = 5146;
const urlPrefix = "http://localhost:" + port + "/api";

export async function addNewUserAsync(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "id": username, "password": password })
  };

  const response = await fetch(urlPrefix + "/Users", requestOptions);
  if (response.ok) {
    const token = await response.text();
    console.log("token in addNewUserAsync: " + token)
    return token;
  }
  return -1;
}

export async function LogInAsync(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "id": username, "password": password })
  };

  const response = await fetch(urlPrefix + "/LogIn", requestOptions);
  if (response.ok) {
    const token = await response.text();
    console.log("token in addNewUserAsync: " + token)
    return token;
  }
  return -1;
}


// get the user's contacts
export async function getContactsAsync(token) {
  console.log("token in getContactsAsync is:")
  console.log(token);

  const requestOptions = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  };

  const response = await fetch(urlPrefix + "/contacts", requestOptions);
  const json = await response.json()

  console.log("User contacts are: ");
  console.log(json);

  return json;
}

// get the user's messages with contactId
export async function getContactsMessagesAsync(token, contactId) {
  console.log("token in getContactsMessagesAsync is:")
  console.log(token);

  const requestOptions = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }};

  const response = await fetch(urlPrefix + "/contacts/" + contactId + "/messages" , requestOptions);
  const json = await response.json()

  console.log("Messages with" + contactId +  " are: ");
  console.log(json);

  return json;
}












export async function addContactAsync(username, contactUsername, contactNickname, contactServer) {
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
