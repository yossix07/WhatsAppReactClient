
// export async function getContactsAsync(username) {
//     const response = 
//       fetch("http://localhost:5008/WeatherForecast", { 
//         headers: {'Content-Type': 'application/json'}
//       }).then(res => res.json().then(data => (
//         {
//           data: data,
//           status: res.status
//         })
//         ))
//     console.log((await response).data)
// }


// export async function getContactsAsync(username) {
//   const response = 
//     fetch("http://localhost:5008/WeatherForecast", { 
//       headers: {'Content-Type': 'application/json'}
//     }).then(res => res.json().then(data => (
//       {
//         data: data,
//         status: res.status
//       })
//       ))
//   console.log((await response).data)
// }


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

export async function addContactAsync() {
  
}

// sends a new chat invitation
export async function sendChatInvitationAsync(InvitationSender, InvitationReciver, ReciverServer) {
  console.log(InvitationSender);
  console.log(InvitationReciver);
  console.log(ReciverServer);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "from": InvitationSender, "to": InvitationReciver, "server": "localhost" + port})
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