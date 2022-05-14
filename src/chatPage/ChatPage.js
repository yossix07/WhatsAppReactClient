import { Tab, Col, Row } from "react-bootstrap";
import "./Chat.css";
import { getContactsAsync } from "../Users/DBQuerys";
import ContactsBar from "./ContactsBar";
import ChatWindow from "./chatWindow/ChatWindow";
import ContactListResult from "./chatWindow/ContactListResults";
import { useEffect, useState } from "react";


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

    useEffect(()=> { 
        async function fetchContacts() {
            setcontactsList(await getContactsAsync(props.token));
        }
        fetchContacts();

        console.log("in use effect: ")
        console.log(contactsList);
        
    }, []);

    const [contactsList, setcontactsList] = useState(null);

    // search contacts' filter by nickname
    function doSearch(query) {
        if (contactsList) {
            setcontactsList(contactsList.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase())));
        }
    }

    // var chatWindows;

    // // create each contact it's chat window
    // if (contactsList) {
    //     chatWindows = Array.from(contactsList).map((contact, key) => {
    //         return (
    //             <ChatWindow
    //                 link={contact.id}
    //                 token = {props.token}
    //                 image={null}
    //                 nickname={contact.name}
    //                 contactName={contact.id}
    //                 myUser={"a"}
    //                 refreshChat={refreshChat}
    //                 key={key}>
    //             </ChatWindow>
    //         );
    //     })
    // }

    return (
        <div>
            <Tab.Container id="list-group-tabs" defaultActiveKey="#def">
                <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={3} className="vh-100">
                        <ContactsBar myUser={props.user} refreshChat={refreshChat} doSearch={doSearch} setToken={props.setToken}></ContactsBar>
                        <ContactListResult user={props.user} contacts={contactsList}>
                        </ContactListResult>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={9}>
                        <Tab.Content>
                            {/* {chatWindows} */}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>

    );
}

export default Chat;
