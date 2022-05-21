import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { validateAddContact } from "../Users/UsersChatDB";
import ProfilePicModal from "./ProfilePicModal";
import profilePic from "../Users/ProfilePictures/DefalutProfilePic.jpg";
import SignOffModal from "./SignOffModal";
import AddContactModal from "./AddContactModal";

// create search contact button
function SearchAwareToggle({ children, eventKey, callback }) {

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    return (
        <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={decoratedOnClick}>
            <i className="bi bi-search"></i>
        </button>
    );
}

function validateAddContactKeyUp(username, talkWith) {
    var errorMsg = validateAddContact(username, talkWith);
    if (errorMsg === "") {
        document.getElementById("add-contact-input").classList.add('is-valid');
        document.getElementById("add-contact-input").classList.remove('is-invalid');
        return true;
    }
    document.getElementById("addContactInvalidFeedback").innerHTML = errorMsg;
    document.getElementById("add-contact-input").classList.remove('is-valid');
    document.getElementById("add-contact-input").classList.add('is-invalid');
    return false;
}

function ContactsBar(props) {

    const [isSignOffModelOpen, setIsSignOffModelOpen] = useState(false);

    const showSignOffModal = () => {
        setIsSignOffModelOpen(true);
    };
    const hideSignOffModal = () => {
        setIsSignOffModelOpen(false);
    }

    const [isProfilePicModelOpen, setIsProfilePicModelOpen] = useState(false);

    const showProfilePicfModal = () => {
        setIsProfilePicModelOpen(true);
    };
    const hideProfilePicModal = () => {
        setIsProfilePicModelOpen(false);
    };

    const [isAddContactModelOpen, setAddContactModelOpen] = useState(false);

    const showAddContactModal = () => {
        setAddContactModelOpen(true);
    };
    const hideAddContactModal = () => {
        setAddContactModelOpen(false);
    };

    const addContactRef = useRef("");

    useEffect(() => {
        document.getElementById("add-contact-input").addEventListener("keyup", function (event) { validateAddContactKeyUp(props.myUser, addContactRef.current.value); })
    }, [props.myUser])

    const searchContact = function () {
        props.doSearch(props.searchBox.current.value);
        // props.refreshContactList();
    }

    return (
        <>
            <SignOffModal isOpen={isSignOffModelOpen} hideModal={hideSignOffModal} setToken={props.setToken} setUsername={props.setUsername}></SignOffModal>
            <ProfilePicModal isOpen={isProfilePicModelOpen} hideModal={hideProfilePicModal} myUser={props.myUser}></ProfilePicModal>
            <AddContactModal isOpen={isAddContactModelOpen} hideModal={hideAddContactModal} myUser={props.myUser}
            token={props.token} connection={props.connection} getRefresh={props.getRefresh} addContact={props.addContact}></AddContactModal>
            <div className="icons_item">
                <Accordion>
                    <Card>
                        <Card.Header>
                            <div className="d-flex justify-content-between">
                                <img id="profile_pic" src={profilePic} className="rounded-circle user_img_msg" alt="profile" />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={showAddContactModal}>
                                    <i className="bi bi-person-plus-fill"></i>
                                </button>
                                <SearchAwareToggle eventKey="0"></SearchAwareToggle>
                                <button type="button" className="btn btn-outline-secondary" onClick={showSignOffModal}>
                                    <i className="bi bi-power"></i>
                                </button>
                            </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <input type="search" ref={props.searchBox} className="form-control type_msg" id="search-input" placeholder="Search contacts..." onKeyUp={searchContact} onChange={searchContact} aria-label="Search contacts..." />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div id="add_contact_form" noValidate>
                                    <div className="input-group">
                                        <input ref={addContactRef} id="add-contact-input" type="text" placeholder="Add contacts..." aria-label="Add contacts..." className="form-control type_msg" />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-outline-secondary" id="add_contact_btn">
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                        <div className="valid-feedback">
                                            You can add this contact
                                        </div>
                                        <div id="addContactInvalidFeedback" className="invalid-feedback"></div>
                                    </div>
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </>
    );
}

export default ContactsBar;