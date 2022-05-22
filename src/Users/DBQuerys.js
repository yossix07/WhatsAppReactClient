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
  const requestOptions = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  };

  const response = await fetch(urlPrefix + "/contacts", requestOptions);

  if(response.ok) {
    const json = await response.json()
    return json;
  } else if(response.status == 401){
    return -1;
  } else {
    return 0;
  }
 
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
  return response.ok;
}

async function addContactToMyServer(to, nickname, server, token) {
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
  try {
    var result = await addToContactServer(from, to , server);
    if (result) {
      result = await addContactToMyServer(to, nickname, server, token);
      if(result) {
        return 1;
      }
      return 0;
    }
    return -1;
  } catch {
    return -1;
  }
}

async function addMessageToContactServer(from, to, server, content) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"from": from,  "to": to,  "content": content })
  };

  const response = await fetch("http://" + server + "/api/transfer/", requestOptions);
  return response.ok;
}

async function addMessageToMyServer(to, server, content, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({"content": content })
  };

  const response = await fetch("http://" + server + "/api/Contacts/" + to + "/Messages", requestOptions);
  return response.ok;
}

export async function sendMessage(from, to, server, content, token) {
  var result = await addMessageToContactServer(from, to , server, content);
  if (result) {
    result = await addMessageToMyServer(to, server, content, token);
    if(result) {
      return 1;
    }
    return 0;
  }
  return -1;
}

