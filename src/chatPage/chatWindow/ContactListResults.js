import { ListGroup } from "react-bootstrap";
import Contact from "../Contact";
import profilePic from "../../Users/ProfilePictures/DefalutProfilePic.jpg"


function ContactListResult(props) {

    var contactList;

    // get all contacts of user
    if (props.contacts) {
        contactList = Array.from(props.contacts).map((contact, key) => {
            return (
                <Contact 
                    image={profilePic}
                    link={contact.id}
                    usernick={contact.name}
                    lastTime={(contact.lastdate)?.substr(11, 5)}
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