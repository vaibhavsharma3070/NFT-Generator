import { useState } from "react";
import Toast from 'react-bootstrap/Toast';

const Toast = () => {

    const [show, setShow] = useState(false);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    )
}

export default Toast;
