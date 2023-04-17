import { Button, Checkbox, Form, Input, Radio, Row, Col, message } from "antd";
import axios from "../axios/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    signup(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //
  const signup = async (model) => {
    axios.post("/signup", { ...model }).then((response) => {
      if (response.data.code == 400) {
        message.error(response.data.error);
        return;
      }
      message.success("Sign Up successful, please login");
      navigate("/login", { replace: true });
    });
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Row
        style={{
          backgroundColor: "#001628",
          paddingTop: "100px",
          minHeight: "100vh",
        }}
      >
        <Col span={12} offset={6}>
          <section className="our-log-reg bgc-fa">
            <div className="container">
              <div className="row">
                <div
                  className="col-sm-12 col-lg-6 offset-lg-3"
                  style={{ backgroundColor: "white", padding: "20px" }}
                >
                  <div className="row" style={{ textAlign: "center" }}>
                    <h2>My cardGPT</h2>
                  </div>
                  <div className="row">
                    {" "}
                    <h2>Sign Up</h2>
                  </div>
                  <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
