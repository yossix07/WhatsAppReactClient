import { Tab, Col, Row } from "react-bootstrap";
import "./Chat.css";
import { getContactsAsync } from "../Users/DBQuerys";
import ContactsBar from "./ContactsBar";
import ChatWindow from "./chatWindow/ChatWindow";
import ContactListResult from "./chatWindow/ContactListResults";
import { useEffect, useState } from "react";
import profilePic from "../Users/ProfilePictures/DefalutProfilePic.jpg";
import * as signalR from "@microsoft/signalr";
import $ from "jquery"

function Chat(props) {

    const [refresh, setRefresh] = useState(0);

    const refreshChat = () => {
        if (refresh === 0) {
            setRefresh(1);
        }
        else {
            setRefresh(0);
        }
    }

    $(document).ready(async () => {
        var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5146/myHub")
        .configureLogging(signalR.LogLevel.Information).build();

        // connection.on("ContactChangeRecieved", (value) => {
        //     console.log("in contacts change");
        //     setcontactsList(value);
        // });

        // connection.on("MessageChangeRecieved", (value) => {
        //     console.log("in contacts change");
        //     setcontactsList(value);
        // });

        await connection.start({ withCredentials: false }).then(() => {
            console.log("SignalR Coneected!");
            console.log(connection);
        }).catch((e) => {
            console.log(e);
        });
    });

    useEffect(() => {
        async function fetchContacts() {
            setcontactsList(await getContactsAsync(props.token));
        }
        fetchContacts();

        console.log("Contacts in use effect: ")
        console.log(contactsList);

    }, []);

    const [contactsList, setcontactsList] = useState(null);

    // search contacts' filter by nickname
    function doSearch(query) {
        if (contactsList) {
            setcontactsList(contactsList.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase())));
        }
    }

    var chatWindows;
    const getChatWindows = () => {
        // create each contact it's chat window
    if (contactsList) {
        chatWindows = contactsList.map((contact, key) => {
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
                            setToken={props.setToken} token={props.token} setUsername={props.setUsername}>
                        </ContactsBar>
                        <ContactListResult user={props.user} contacts={contactsList}>
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

export default Chat;