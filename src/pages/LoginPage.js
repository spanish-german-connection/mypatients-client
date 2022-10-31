import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = () => {
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      {errorMessage && (
        <Row>
          <Col span="4" offset="10">
            <Alert
              message="There was an error"
              description={errorMessage}
              type="error"
              showIcon
            />{" "}
          </Col>
        </Row>
      )}

      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 4 }}
        initialValues={{ remember: true }}
        onFinish={handleLoginSubmit}
        autoComplete="off"
      >
        <Divider>Login</Divider>
        <Form.Item
          label="Email:"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          rules={[
            { required: true, message: "Please input your username!" },
            {
              type: "email",
              warningOnly: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password:"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
              message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
              warningOnly: false,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 9, span: 6 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
