import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";

import { Outlet, Link } from "react-router-dom";
const { Header, Sider } = Layout;
const items1 = ["Comp 264- Group 3"].map((key) => ({
  key,
  label: `${key}`,
}));
const menu = ["Contacts", "Upload New Business Card"];
const link = ["", "upload"];
const items2 = [UserOutlined, UploadOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: <Link to={`/${link[index]}`}>{menu[index]}</Link>,
  };
});
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={"sub0"}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["0"]}
            style={{
              height: "100%",
              borderRight: 0,
              paddingTop: "10px",
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            height: "100vh",
            padding: "0 24px 24px",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Home;
