import React, { useState } from "react";
import { SignUpApi } from "../Api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Menu from "./Menu";

const SignUp = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [toast, setToast] = useState({ show: '', message: '', event: '' });
  const [formError, setFormError] = useState({});
  const submitHandler = () => {
    let error = {};
    let isValidData = true;
    for (let property in formData) {
      if (formData[property] === "") {
        error[property] = `${property} is required`;
        isValidData = false;
      }
      setFormError(error);
    }
    if (isValidData) {
      SignUpApi(formData)
        .then((res) => {
          setToast({ message: res.data.message, show: true, event: "success" });
          setFormData({ email: "", password: "", firstname: "", lastname: "" });
          alert("Signup Successful.");
          navigate("/Login");
        })
        .catch((err) => {
          let error = err?.response?.data?.errors?.Register?.message
          setToast({ message: error, show: true, event: "danger" });
        });
    }
  };

  const onClickHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };
  return (
    <>
      <Menu />
      <ToastContainer className="p-3" position="top-center">
        <Toast onClose={() => setToast({ ...toast, show: false })} show={toast?.show} bg={toast?.event} autohide>
          <Toast.Body className='text-white'>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className="mb-4">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={5}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label for="firstname">Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={onClickHandler}
                />
                {formError?.firstname && (
                  <p className="text-danger">{formError?.firstname}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label for="lastname">Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={onClickHandler}
                />
                {formError?.lastname && (
                  <p className="text-danger">{formError?.lastname}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label for="email">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={onClickHandler}
                />
                {formError?.email && (
                  <p className="text-danger">{formError?.email}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label for="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={onClickHandler}
                />
                {formError?.password && (
                  <p className="text-danger">{formError?.password}</p>
                )}
              </Form.Group>
              <div style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Button variant="primary" type="button" onClick={submitHandler}>
                  Register
                </Button>
                <div
                  style={{ display: "flex", }}
                >
                  <Form.Text className="text-muted">
                    Registered Already?
                  </Form.Text>
                  <Form.Text className="text-muted">
                    <Link to="/Login" className="">
                      Login{" "}
                    </Link>
                  </Form.Text>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
