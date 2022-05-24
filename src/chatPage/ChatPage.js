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

function ChatPage(props) {

    const connection = props.connection;

    const [refresh, setRefresh] = useState(0);

    const refreshChat = () => {
        if (refresh === 0) {
            setRefresh(1);
        }
        else {
            setRefresh(0);
        }
    }

    function addContact(contact) {
        let cont = [...contactsList];
        cont?.push(contact);
        setContactsList(cont);
    }



    async function listenToNewContacts() {
        if (connection != false) {
            await connection?.on("ContactChangeRecieved", (contact) => {
                addContact(contact);
            });
        }
    }
    listenToNewContacts();

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
    }, []);

    const [contactsList, setContactsList] = useState([]);
    const [searchList, setSearchList] = useState(null);
    const [refreshList, setRefreshList] = useState(0);

    const refreshContactList = () => {
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
                        connection={connection}
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
                            connection={connection} addContact={addContact}
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

export default ChatPage;