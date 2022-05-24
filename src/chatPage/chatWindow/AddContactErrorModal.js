import Modal from "react-bootstrap/Modal";

function AddContactErrorModal(props) {

    const onCancel = () => {
        document.getElementById("addContactModal").setAttribute("animation","false");
        props.hideModal();
        props.hideErrorModal();
        
    }

    return (
        <Modal show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header className="justify-content-between bg-dark text-white" >
                <Modal.Title >Invalid Contact!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">Something went wrong! Make sure the contact's username and server are valied!</Modal.Body>
            <Modal.Footer className="bg-dark text-white">
            <button className="btn btn-outline-light" onClick={props.hideErrorModal}>Try Again</button>
                <button className="btn btn-outline-light" onClick={onCancel}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddContactErrorModal;