import { Alert, Button, Checkbox, Form, Input } from "antd";
import Title from "antd/lib/skeleton/Title";
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

  const handleLoginSubmit = (values) => {
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
        <Alert
          message="There was an error"
          description={errorMessage}
          type="error"
          showIcon
        />
      )}

      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 4 }}
        initialValues={{ remember: true }}
        onFinish={handleLoginSubmit}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Title>Login</Title>
        </Form.Item>
        <Form.Item
          label="Email:"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password:"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          rules={[{ required: true, message: "Please input your password!" }]}
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
