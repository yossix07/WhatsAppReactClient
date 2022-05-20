import { Tab, Col, Row } from "react-bootstrap";
import "./Chat.css";
import { getContactsAsync } from "../Users/DBQuerys";
import ContactsBar from "./ContactsBar";
import ChatWindow from "./chatWindow/ChatWindow";
import ContactListResult from "./chatWindow/ContactListResults";
import { useEffect, useState, useRef } from "react";
import profilePic from "../Users/ProfilePictures/DefalutProfilePic.jpg";
import * as signalR from "@microsoft/signalr";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function ChatPageVisual(props) {

    const [refresh, setRefresh] = useState(0);

    const refreshChat = () => {
        if (refresh === 0) {
            setRefresh(1);
        }
        else {
            setRefresh(0);
        }
    }

    // const func = () => {
    //     async function a() {
    //         var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5146/myHub").build();

    //     await connection.start({ withCredentials: false }).then(() => {
    //         console.log("SignalR Coneected!");
    //         console.log(connection);
    //     }).catch((e) => {
    //         console.log(e);
    //     });

    //     console.log(props.user)
    //     await connection.invoke("Connect", props.user);

    //     connection.on("ContactChangeRecieved", (contact) => {
    //         console.log("got contact:")
    //         console.log(contact);

    //         let cont = contactsList;

    //         console.log("local contacts list is:")
    //         console.log(cont);

    //         cont?.push(contact);

    //         console.log("after addition contacts list is:")
    //         console.log(cont);
    //         setcontactsList(cont);
    //     });
    //     } 
    //     a();
    // }
    // func();

    var contactsRefresh = 0;

    const getRefresh = () => {
        return contactsRefresh;
    }

    var connection = props.connection;

    const getConnection = () => {
        async function getConnectionAsync() {
            return await connection;
        }
        return getConnectionAsync();
    }



    async function a() {
        if (connection?.connectionStarted) {
            await connection.on("ContactChangeRecieved", (contact) => {
                console.log("got contact:")
                console.log(contact);
                addContact(contact);
            });
        }
    }
    a();

    const checkRefresh = () => {
        async function a() {
            if (connection?.connectionStarted) {
                await connection?.on("RefreshContacts", (refreshNewValue) => {
                    console.log("got refresh value:")
                    console.log(refreshNewValue);

                    contactsRefresh = refreshNewValue;
                });
            }
        }
        a();
    }

    checkRefresh();

    // useEffect(() => {
    //     async function setNewContactsList() {
    //         if (connection.connectionStarted) {
    //             await connection.on("ContactChangeRecieved", (contact) => {
    //                 console.log("got contact:")
    //                 console.log(contact);
    //                 addContact(contact);
    //             });
    //         }
    //     }
    //     setNewContactsList();
    // }, [contactsRefresh]);

    function addContact(contact) {
        let cont = [...contactsList];

        console.log("local contacts list is:")
        console.log(cont);

        cont?.push(contact);

        console.log("after addition contacts list is:")
        console.log(cont);
        setContactsList(cont);
    }

    function editContact(contact) {
        let cont = [...contactsList];
        let oldContact = cont?.findIndex(c => c.id == contact.id);
        cont[oldContact] = contact;
        setContactsList(cont);
    }

    let navigate = useNavigate();

    const goToLogIn = () => {
        navigate("/", { replace: true });
    }

    useEffect(() => {
        async function fetchContacts() {
            const serverContacts = await getContactsAsync(props.token);
            if (serverContacts != -1) {
                setContactsList(serverContacts);
            } else {
                goToLogIn();
                props.showAuthorizationErrorModal();
            }
        }
        fetchContacts();

        console.log("Contacts in use effect: ")
        console.log(contactsList);

    }, []);

    const [contactsList, setContactsList] = useState(null);
    const [searchList, setSearchList] = useState(null);
    const [refreshList, setRefreshList] = useState(0);

    const refreshContactList = () => {
        console.log("refreshing list by search")
        if (refreshList == 0) {
            setRefreshList(1);
        } else {
            setRefreshList(0);
        }
    }

    const searchBox = useRef(null);


    // search contacts' filter by nickname
    function doSearch(query) {
        if (contactsList) {
            setSearchList(contactsList.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase())));
        }
    }

    let currentContacts;

    if (searchBox.current != null && searchBox.current.value != "") {
        console.log("get search list");
        currentContacts = searchList;
    } else if (contactsList) {
        currentContacts = contactsList;
    }

    var chatWindows;

    // create each contact it's chat window
    const getChatWindows = () => {
        if (currentContacts) {
            chatWindows = currentContacts.map((contact, key) => {
                return (
                    <ChatWindow
                        link={contact.id}
                        token={props.token}
                        image={profilePic}
                        nickname={contact.name}
                        contactName={contact.id}
                        contactServer={contact.server}
                        myUser={props.user}
                        refreshChat={refreshChat}
                        editContact={editContact}
                        key={key}>
                    </ChatWindow>
                );
            })
        }
    }

    getChatWindows();

    return (
        <div>
            <Tab.Container id="list-group-tabs" defaultActiveKey="#def">
                <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={3} className="vh-100">
                        <ContactsBar myUser={props.user} refreshChat={refreshChat} doSearch={doSearch}
                            setToken={props.setToken} token={props.token} setUsername={props.setUsername}
                            connection={connection} getRefresh={getRefresh} addContact={addContact}
                            searchBox={searchBox} refreshContactList={refreshContactList}>
                        </ContactsBar>
                        <ContactListResult user={props.user} contacts={currentContacts}>
                        </ContactListResult>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={9}>
                        <Tab.Content>
                            {chatWindows}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    );
}

export default ChatPageVisual;