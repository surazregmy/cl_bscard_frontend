import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Layout, message } from "antd";
import { Space, Table, Tag, Input, Modal } from "antd";
import axios from "../axios/axios";
import { DeleteOutlined } from "@ant-design/icons";
const { Content } = Layout;

const { Search } = Input;

const Contact = () => {
  const [cards, setCards] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const handleSearch = (e) => {
    let acc = localStorage.getItem("access_id");
    setSearchKey(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    let acc = localStorage.getItem("access_id");
    if (!searchKey) {
      axios
        .get(`/cards/${acc}`)
        .then(async (res) => {
          setCards(res.data);
          message.success("Cards Retrival Successful");
        })
        .catch((err) => {
          console.log(err);
          message.error("Cards Retrival failed");
        })
        .finally(() => {});
    } else {
      axios
        .post(`/cards/${acc}/search-text`, {
          name: searchKey,
        })
        .then(async (res) => {
          setCards(res.data);
          message.success("Cards Retrived for " + searchKey);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [searchKey]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [deleteId, setdeleteId] = useState();
  const deletInitialize = (id) => {
    setdeleteId(id);
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleModelOk = () => {
    setLoading(true);
    let acc = localStorage.getItem("access_id");
    axios
      .delete(`/cards/${deleteId}/${acc}/delete-card`)
      .then(async (res) => {
        axios.get(`/cards/${acc}`).then(async (res) => {
          setCards(res.data);
          message.success("Cards Deleted Successful");
        });
      })
      .catch((err) => {
        message.error("Can not delete card.");
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const handleModelCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text) => <a href="hi">{text}</a>,
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
          <Button
            type="link"
            danger
            size="large"
            onClick={() => {
              deletInitialize(record.id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

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
              onPressEnter={(val) => handleSearch(val)}
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
      <Modal
        title="Confirm"
        open={open}
        onOk={handleModelOk}
        confirmLoading={loading}
        onCancel={handleModelCancel}
      >
        Do you want to Delete?
      </Modal>
    </>
  );
};
export default Contact;
