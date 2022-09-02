import React, { useState } from "react";
import { LoginApi } from "../Api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';

const Login = () => {
  let navigate = useNavigate();
  const isAdmin = true;
  const [toast, setToast] = useState({ show: '', message: '' });

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({});
  const submitHandler = () => {
    const error = {};
    const isValidData = true;
    for (const property in formData) {
      if (formData[property] === "") {
        error[property] = `${property} is required`;
      }
      setFormError(error);
    }
    if (isValidData) {
      LoginApi(formData)
        .then((res) => {
          // props.dispatch(setPartnerList(res.data));
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("role", res.data.data.roles);
          setFormData({ email: "", password: "" });
          if (res.data.data.roles !== "Admin") {
            navigate("/Home");
          }
          else {
            navigate("/Admin");
          }
          setToast({ message: res.data.message, show: true });
        })
        .catch((err) => {
          console.log("Error caught!", err);
          setToast({ message: 'Something went wrong', show: true });

        });
    }
  };
  const onClickHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  return (
    <>
      {/* <Toast onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast> */}
      <Container className="mb-4">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={5}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label for="email">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={onClickHandler}
                />
              </Form.Group>
              <Form.Text className="text-muted" style={{ color: "red" }}>
                {formError?.email}
              </Form.Text>

              <Form.Group className="mb-3">
                <Form.Label for="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={onClickHandler}
                />
              </Form.Group>
              <Form.Text className="text-muted" style={{ color: "red" }}>
                {formError?.password}
              </Form.Text>
              <Button variant="primary" type="button" onClick={submitHandler}>
                Login
              </Button>
              <br />
              <Container
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Form.Text className="text-muted">
                  {"New to MyNFT? "}
                </Form.Text>
                <Form.Text className="text-muted">
                  <Link to="/" className="">
                    {" Register"}
                  </Link>
                </Form.Text>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
