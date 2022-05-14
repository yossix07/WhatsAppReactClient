import { ListGroup } from "react-bootstrap";
import Contact from "../Contact";
import profilePic from "../../Users/ProfilePictures/DefalutProfilePic.jpg"


function ContactListResult(props) {

    console.log("in ContactListResult:");
    console.log(props.contacts);

    var contactList;

    // get all contacts of user
    if (props.contacts) {
        contactList = Array.from(props.contacts).map((contact, key) => {
            return (
                <Contact 
                    image={profilePic}
                    link={contact.id}
                    usernick={contact.name}
                    lastTime={contact.lasttime}
                    lastMsg={contact.last}
                    key={key}>
                </Contact>
            );
        })
    }

    return (
        <ListGroup className="contacts_list">
            {contactList}
        </ListGroup>
    );
}

export default ContactListResult;