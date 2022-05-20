import "./Chat.css";
import * as signalR from "@microsoft/signalr";
import ChatPageVisual from "./ChatPageVisual";

function Chat(props) {

    function setHub(callback) {
        async function set() {
            var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5146/myHub").build();

            await connection.start(() => callback(connection));

            await connection.invoke("Connect", props.user);
        }
        set();
    }

    return (
        <ChatPageVisual
            token={props.token}
            user={props.user}
            setToken={props.setToken}
            setUsername={props.setUsername}
            showAuthorizationErrorModal={props.showAuthorizationErrorModal}>
        </ChatPageVisual>
    );

}

export default Chat;