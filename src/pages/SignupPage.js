import { Alert, Button, Checkbox, Divider, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = () => {
    const requestBody = { email, password, name };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
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
        onFinish={handleSignupSubmit}
        autoComplete="off"
      >
        <Divider>Signup</Divider>
        <Form.Item
          label="Email:"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          rules={[
            { required: true, message: "Please input your email!" },
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
          label="Name:"
          type="name"
          name="name"
          value={name}
          onChange={handleName}
          rules={[
            { required: true, message: "Please input your name!" },
            {
              type: "string",
              min: 3,
              warningOnly: true,
            },
          ]}
        >
          <Input />
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
    </div>
  );
}

export default SignupPage;
