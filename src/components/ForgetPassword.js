import React, { useState } from "react";
import { ForgetPasswordApi, LoginApi } from "../Api/api";
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

const ForgetPassword = () => {
  let navigate = useNavigate();
  const isAdmin = true;
  const [toast, setToast] = useState({ show: '', message: '', event: '' });
  const [formData, setFormData] = useState({ old_password: "", new_password: "" ,confirm_password: "" });
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
      ForgetPasswordApi(formData)
        .then((res) => {
            
            if(res.data.message === "Password change successfully"){
                setToast({ message: res.data.message, show: true, event: "success" });
                setFormData({ old_password: "", new_password: "" ,confirm_password: "" });
                setTimeout(()=>{
                    navigate("/admin/home");
                },1000)
            }
        })
        
        .catch((err) => {
            let error = err?.response?.data?.message
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
                <Form.Label for="email">Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Old Password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={onClickHandler}
                />
                {formError?.old_password && (
                  <p className="text-danger">{formError?.old_password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label for="password">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={onClickHandler}
                />
                {formError?.new_password && (
                  <p className="text-danger">{formError?.new_password}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label for="password">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={onClickHandler}
                />
                {formError?.confirm_password && (
                  <p className="text-danger">{formError?.confirm_password}</p>
                )}
              </Form.Group>
              <br />
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button variant="primary" type="button" onClick={submitHandler}>
                  Confirm
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgetPassword;
