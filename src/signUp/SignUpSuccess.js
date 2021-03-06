import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function SignUpSuccess(props) {
    let navigate = useNavigate();

    const goToChats = () => {
        navigate("/chat", { replace: true });
    }

    return (
        <Modal backdrop="static" show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header className="bg-dark text-white">
                <Modal.Title>Hi {props.name}!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">You are ready to chat!</Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                <button className="btn btn-outline-light" onClick={goToChats}>Start Chatting</button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpSuccess;