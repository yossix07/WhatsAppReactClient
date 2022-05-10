import Modal from "react-bootstrap/Modal";
import { setProfilePicture } from "../Users/UsersDB";
import InvalidFileModal from "../InvalidFileModal";
import { useState, useRef } from "react";
import Form from 'react-bootstrap/Form'
import { Container } from "react-bootstrap";
import "./AddContactModal.css";
import $ from "jquery";
import { sendChatInvitationAsync, addContactAsync } from "../Users/DBQuerys";
import AddContactErrorModal from "./chatWindow/AddContactErrorModal";

function AddContactModal(props) {

    const contactUsername = useRef("");
    const contactNickname = useRef("");
    const contactServer = useRef("");

    $(document).ready(function () {

        $("#addContactBtn").unbind("click").on("click", function (e) {
            $("#addContactForm").submit();
        })

        $("#addContactForm").unbind("submit").on("submit", function (event) {
            event.preventDefault();
            if (sendChatInvitationAsync(props.myUser, contactUsername.current.value, contactServer.current.value) == 201) {
                console.log("good");
                addContactAsync(props.myUser, contactUsername.current.value, contactNickname.current.value, contactServer.current.value);
            } else {
                console.log("bad");
                showError();
            }
            return false;
        });
    });


    const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);

    const showError = () => {
        document.getElementById("addContactModal").setAttribute("hidden","");
        setIsErrorModelOpen(true);
    };
    const hideError = () => {
        setIsErrorModelOpen(false);
        document.getElementById("addContactModal").removeAttribute("hidden","");
    };


    return (
        <>
        <AddContactErrorModal isOpen={isErrorModelOpen} hideErrorModal={hideError} hideModal={props.hideModal}> </AddContactErrorModal>
            <Modal id="addContactModal" show={props.isOpen} onHide={props.hideModal} >
                <Modal.Header className="bg-dark text-white">
                    <Modal.Title>Add New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Container className="container py-2 h-40">
                        <Form id="addContactForm">
                            <Form.Group>
                                <Form.Control ref={contactUsername} type="text" placeholder="Enter Username" />
                                <Form.Label>Username</Form.Label>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control ref={contactNickname} type="text" placeholder="Enter Nickname" />
                                <Form.Label>Nickname</Form.Label>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control ref={contactServer} type="text" placeholder="Enter Server" />
                                <Form.Label>Server</Form.Label>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="bg-dark text-white">
                    <button id="addContactBtn" className="btn btn-outline-light">Add</button>
                    <button className="btn btn-outline-light" onClick={props.hideModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddContactModal;