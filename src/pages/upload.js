import { useState } from "react";
import { Breadcrumb, Col, Image, Layout, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Spin } from "antd";
import { Form, Input } from "antd";
import axios from "../axios/axios";
import { redirect } from "react-router-dom";

const { Content } = Layout;

const getBase64 = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = () => {
  const [file, setFile] = useState();
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [card, setCard] = useState();

  const handleUpload = async () => {
    if (file == null || file == "") {
      message.error("Please select image first");
      return;
    }
    setShowForm(false);
    setHasUploaded(false);
    const filename = file.name;
    const filebytes = await getBase64(file);

    setUploading(true);
    // You can use any AJAX library you like
    axios
      .post("/images", {
        filename: filename,
        filebytes: filebytes.split(",")[1],
      })
      .then(async (res) => {
        setUploadResponse(res.data);
        setHasUploaded(true);
        detectField(res);
        // Pass it to the text recognition
      })
      .then(() => {
        setFile({});
        message.success("upload successfully.");
      })
      .catch((err) => {
        console.log(err);
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const detectField = async (res) => {
    setScanning(true);
    axios
      .get(`/images/${res.data.fileId}/detect-field`)
      .then(async (res) => {
        setCard(res.data);
        setShowForm(true);
      })
      .then(() => {
        setFile({});
        message.success("Image Scanned successfully.");
        setScanning(false);
        setHasScanned(true);
      })
      .catch((err) => {
        console.log(err);
        message.error("Scanning failed.");
      })
      .finally(() => {
        setScanning(false);
        setHasScanned(true);
      });
  };

  const props = {
    onRemove: (file) => {
      setFile({});
    },
    beforeUpload: (file) => {
      setFile(file);

      return false;
    },
    file,
  };

  const onFinish = async (values) => {
    // Save In the database
    console.log("values:", values);
    axios
      .post(`/cards/${uploadResponse.fileId}/save-field`, {
        access_id: localStorage.getItem("access_id"),
        ...values,
      })
      .then(() => {
        message.success("Card Added successfully.");
      })
      .catch((err) => {
        console.log(err);
        message.error("Error in Adding Card");
      })
      .finally(() => {});
    return redirect("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Upload</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "white",
        }}
      >
        <Row justify="space-around">
          <Col span={12}>
            <div style={{ textAlign: "center" }}>
              <h3>Upload Business Card Here</h3>
            </div>
            <div style={{ textAlign: "center" }}>
              <Upload maxCount={1} {...props} listType="picture-card">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={file == null}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </div>
            <br></br>
            {hasUploaded && (
              <div
                style={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                <Image src={uploadResponse.fileUrl}></Image>
                {!hasScanned && (
                  <div
                    style={{
                      position: "absolute",
                      top: "300px",
                      left: "300px",
                      zIndex: "3",
                    }}
                  >
                    <Spin tip="Scanning Image..." size="large"></Spin>
                  </div>
                )}
              </div>
            )}
          </Col>
          {showForm && (
            <Col span={12}>
              <div style={{ textAlign: "center" }}>
                <h3>Correct Detected Information</h3>
              </div>
              <div style={{ textAlign: "center" }}>
                <Form
                  name="basic"
                  layout="horizontal"
                  initialValues={{
                    remember: true,
                  }}
                  labelCol={{ span: 9 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    initialValue={card.name}
                    rules={[
                      {
                        required: true,
                        message: "Please input  name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Telephone Number(s)"
                    name="phone"
                    initialValue={card.phone}
                    rules={[
                      {
                        required: true,
                        message: "Please input your telephone!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    initialValue={card.email}
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Company Website"
                    name="website"
                    initialValue={card.website}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Company Address"
                    name="address"
                    initialValue={card.address}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          )}
        </Row>
      </Content>
    </>
  );
};
export default UploadImage;
