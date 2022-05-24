import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function AuthorizationErrorModal(props) {
    let navigate = useNavigate();

    const goToLogIn = () => {
        navigate("/", { replace: true });
        props.hideModal();
    }

    return (
        <Modal backdrop="static" show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header className="bg-dark text-white">
                <Modal.Title>Something Went Wrong!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">Are you trying to mess around?</Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                <button className="btn btn-outline-light" onClick={goToLogIn}>Sorry</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AuthorizationErrorModal;