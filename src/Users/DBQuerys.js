const myServer = "localhost";
const myPort = 5146;
const urlPrefix = "http://" + myServer + ":" + myPort + "/api";

export async function addNewUserAsync(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "id": username, "password": password })
  };

  const response = await fetch(urlPrefix + "/Users", requestOptions);
  if (response.ok) {
    const token = await response.text();
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

  console.log(json);

  return json;
}

// get the user's messages with contactId
export async function getContactsMessagesAsync(token, contactId) {
  const requestOptions = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  };

  const response = await fetch(urlPrefix + "/contacts/" + contactId + "/messages", requestOptions);
  const json = await response.json()

  console.log("Messages with " + contactId + " are: ");
  console.log(json);

  return json;
}

async function addToContactServer(from, to, server) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "to": to, "from": from, "server": myServer + ":" + myPort })
  };

  const response = await fetch("http://" + server + "/api/invitations/", requestOptions);
  console.log("response is: ");
  console.log( response.ok);
  return response.ok;
}

async function addContactToMyServer(to, nickname, server, token) {
  console.log("token is: ");
  console.log(token);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ "id": to, "name": nickname, "server": server })
  };

  const response = await fetch(urlPrefix + "/Contacts", requestOptions);
  return response.ok;
}


export async function addContactAsync(from, to, nickname, server, token) {
  var result = await addToContactServer(from, to , server);
  if (result) {
    console.log("got in");
    result = await addContactToMyServer(to, nickname, server, token);
    console.log("result is:")
    console.log(result);
    if(result) {
      return 1;
    }
    return 0;
  }
  return -1;
}




// export async function addContactAsync(username, contactUsername, contactNickname, contactServer) {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ "myUsername": username, "id": contactUsername, "name": contactNickname, "server": contactServer })
//   };
//   const response = await fetch(urlPrefix + "/contacts", requestOptions).then(res => res.json().then(data => (
//     {
//       data: data,
//       status: res.status
//     })
//   ));

//   const s = response.status;
//   console.log("status is: " + s);
//   return s;
// }

// sends a new chat invitation
// export async function sendChatInvitationAsync(InvitationSender, InvitationReciver, ReciverServer) {
//   console.log(InvitationSender);
//   console.log(InvitationReciver);
//   console.log(ReciverServer);

//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ "from": InvitationSender, "to": InvitationReciver, "server": "localhost" + myPort })
//   };
//   const response = await fetch("http://" + ReciverServer + "/api/invitations", requestOptions).then(res => res.json().then(data => (
//     {
//       data: data,
//       status: res.status
//     })
//   ));

//   const s = response.status;
//   console.log("status is: " + s);
//   return s;
// }