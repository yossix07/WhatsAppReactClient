import { Tab } from "react-bootstrap"
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import SenderMsgBar from "./SendMsgBar";
import ContactHeader from "./ContactHeader";
import { getContactsMessagesAsync } from "../../Users/DBQuerys";
import $ from "jquery";
import { useEffect } from "react";



function ChatWindow(props) {

    const msgContainerId = props.myUser.concat("-").concat(props.user).concat("-msg-container");
    const msgTabPaneId = props.myUser.concat("-").concat(props.user).concat("-msg-tab-pane");

    $(document).ready(function (event) {

        $("#".concat(msgContainerId)).unbind("mouseenter keydown").on("mouseenter keydown", function (e) {
            $("#".concat(msgContainerId)).animate({ scrollTop: $("#".concat(msgContainerId)).get(0).scrollHeight }, 'slow');
        });
    });


    var messages;

    useEffect(()=> { 
        async function fetchMessages() {
            messages = await getContactsMessagesAsync(props.token, props.contactName);
        }
        fetchMessages();

        console.log("messages in use effect: ")
        console.log(messages);
        
    }, []);

    //get all messages of user (sender and reciever)
    var msgList = Array.from(messages).map((m, key) => {

        if (m.sent) {
            return (
                <SenderMessage
                    msgText={m.content}
                    msgTime={m.created}
                    type="text"
                    key={key}>
                </SenderMessage>
            );
        }

        return (
            <ReceiverMessage
                img={null}
                msgText={m.content}
                msgTime={m.created}
                type="text"
                key={key}>
            </ReceiverMessage>
        );
    })

    return (
        <Tab.Pane eventKey={"#".concat(props.link)}>
            <div className="chat" id={msgTabPaneId}>
                <div className="contact_card vh-100">
                    <ContactHeader image={props.image} nickname={props.nickname} ></ContactHeader>
                    <div className="card-body msg_card_body" id={msgContainerId}>
                        {msgList}
                    </div>
                    <SenderMsgBar
                        username={props.user}
                        myUser={props.myUser}
                        refreshChat={props.refreshChat}>
                    </SenderMsgBar>
                </div>
            </div>
        </Tab.Pane>
    );
}

export default ChatWindow;
