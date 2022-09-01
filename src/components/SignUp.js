import React, { useState } from "react";
import { SignUpApi } from "../Api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [formError, setFormError] = useState({});
  const submitHandler = () => {
    const error = {};
    const isValidData = true;
    for (const property in formData) {
      if (formData[property] === "") {
        error[property] = `${property} is required`;
        isValidData = false;
      }
      setFormError(error);
    }
    if (isValidData) {
      SignUpApi(formData)
        .then((res) => {
          // props.dispatch(setPartnerList(res.data));
          setFormData({ email: "", password: "", firstname: "", lastname: "" });
          alert("Signup Successful.");
          navigate("/Login");
        })
        .catch((err) => {
          console.log("Error caught!", err);
        });
    }
  };
  const onClickHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };
  return (
    // <div class="container">

    //     <label for="firstname"><b>firstname</b></label><br />
    //     <input type="text" placeholder="Enter firstname" name="firstname" value={formData.firstname} onChange={onClickHandler} />
    //     <p style={{ color: "red" }}>{formError?.firstname}</p>

    //     <label for="lastname"><b>lastname</b></label><br />
    //     <input type="text" placeholder="Enter lastname" name="lastname" value={formData.lastname} onChange={onClickHandler} />
    //     <p style={{ color: "red" }}>{formError?.lastname}</p>

    //     <label for="email"><b>Email</b></label><br />
    //     <input type="text" placeholder="Enter email" name="email" value={formData.email} onChange={onClickHandler} />
    //     <p style={{ color: "red" }}>{formError?.email}</p>

    //     <label for="password"><b>Password</b></label><br />
    //     <input type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={onClickHandler} />
    //     <p style={{ color: "red" }}>{formError?.password}</p>

    //     <button type="submit" onClick={submitHandler}>Signin</button>

    // </div>
    <>
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
              </Form.Group>
              <Form.Text className="text-muted" style={{ color: "red" }}>
                {formError?.firstname}
              </Form.Text>

              <Form.Group className="mb-3">
                <Form.Label for="lastname">Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={onClickHandler}
                />
              </Form.Group>
              <Form.Text className="text-muted" style={{ color: "red" }}>
                {formError?.lastname}
              </Form.Text>
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
                Register
              </Button>
              <br />
              <Container
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Form.Text className="text-muted">
                  Registered Already?
                </Form.Text>
                <Form.Text className="text-muted">
                  <Link to="/Login" className="">
                    Login{" "}
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

export default SignUp;
