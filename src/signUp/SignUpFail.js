import Modal from "react-bootstrap/Modal";

function SignUpFail(props) {

    return (
        <Modal show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header className="bg-dark text-white">
                <Modal.Title>Something Went Wrong!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">Username already exist! try another username.</Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                <button className="btn btn-outline-light" onClick={props.hideModal}>OK</button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpFail;