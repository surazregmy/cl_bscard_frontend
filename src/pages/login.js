import { Button, Checkbox, Form, Input, Radio, Row, Col, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post("/login", { ...values }).then((response) => {
      if (response.data.code == 400) {
        message.error(response.data.error);
        return;
      }
      message.success("Log  in successful");
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      localStorage.setItem("access_id", response.data.access_id);
      console.log("localstorage");
      console.log(localStorage.getItem("password"));
      console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("access_id"));
      navigate("/", { replace: true });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const signup = async (model) => {};
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
          <section className="our-log bgc-fa" style={{ paddingTop: "7%" }}>
            <div className="container">
              <div className="row">
                <div
                  className="col-sm-12 col-lg-6 offset-lg-3"
                  style={{ backgroundColor: "white", padding: "20px" }}
                >
                  <div className="row" style={{ textAlign: "center" }}>
                    <h2>My cardGPT</h2>
                  </div>
                  <div className="login_form inner_page">
                    <div className="heading">
                      <h3 className="text-center">Login to your account</h3>
                      <p className="text-center">
                        Don't have an account?{" "}
                        <a className="text-thm" href="/signup">
                          Sign Up!
                        </a>
                      </p>
                    </div>
                    <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Username!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Username"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          style={{
                            background: "#FF5A5E",
                            borderColor: "#FF5A5E",
                            color: "white",
                            width: "100%",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                          size="large"
                          //   type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Log in
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
};

export default Login;
