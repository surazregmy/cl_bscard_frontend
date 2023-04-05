import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, message } from "antd";
import { Space, Table, Tag, Input } from "antd";
import axios from "../axios/axios";

const { Content } = Layout;

const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
    render: (text) => <a href="hi">{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a href="/hi">Delete</a>
        <a href="/hi">View</a>
      </Space>
    ),
  },
];

const Contact = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get(`/cards`)
      .then(async (res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Cards Retrival failed");
      })
      .finally(() => {});
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Contacts</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: "white",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <h3>Contacts</h3>
          </div>
          <div>
            <Search
              placeholder="search by name, email"
              enterButton
              style={{ maxWidth: "500px" }}
            />
            <br></br>
            <br></br>
            <Table columns={columns} dataSource={cards} onChange={onChange} />
          </div>
        </Space>
      </Content>
    </>
  );
};
export default Contact;
