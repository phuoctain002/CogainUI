import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, ConfigProvider, theme } from "antd";
import {
  HomeOutlined,
  ExperimentOutlined,
  AppstoreOutlined,
  InteractionOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ExampleComponent from "./components/ExampleComponent";
import CustomDialogDemo from "./pages/Dialog/CGDialogDemo";
import CGComboboxDemo from "./pages/Combobox/CGComboboxDemo";
import CGComboboxDialogDemo from "./pages/ComboboxDialog/CGComboboxDialogDemo";
import CGComboboxWithAddDemo from "./pages/ComboboxWithAdd/CGComboboxWithAddDemo";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm, // Light theme
        token: {
          colorPrimary: "#1890ff",
          colorBgContainer: "#ffffff",
          colorBgElevated: "#ffffff",
          colorBgLayout: "#f5f5f5",
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              background: "#ffffff",
              borderBottom: "1px solid #d9d9d9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                color: "#1890ff",
                fontSize: "20px",
                fontWeight: "bold",
                marginRight: "40px",
              }}
            >
              React App
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: "none",
              }}
              items={[
                {
                  key: "home",
                  icon: <HomeOutlined />,
                  label: <Link to="/">Home</Link>,
                },
                {
                  key: "demo",
                  icon: <ExperimentOutlined />,
                  label: <Link to="/demo">CGDialog Demo</Link>,
                },
                {
                  key: "combobox",
                  icon: <AppstoreOutlined />,
                  label: <Link to="/combobox">Combobox Demo</Link>,
                },
                {
                  key: "combobox-dialog",
                  icon: <InteractionOutlined />,
                  label: <Link to="/combobox-dialog">ComboboxDialog Demo</Link>,
                },
                {
                  key: "combobox-with-add",
                  icon: <PlusCircleOutlined />,
                  label: (
                    <Link to="/combobox-with-add">ComboboxWithAdd Demo</Link>
                  ),
                },
              ]}
            />
          </Header>
          <Content
            style={{
              padding: "0",
              minHeight: "calc(100vh - 134px)",
              background: "#f5f5f5",
            }}
          >
            <Routes>
              <Route path="/" element={<ExampleComponent />} />
              <Route path="/demo" element={<CustomDialogDemo />} />
              <Route path="/combobox" element={<CGComboboxDemo />} />
              <Route
                path="/combobox-dialog"
                element={<CGComboboxDialogDemo />}
              />
              <Route
                path="/combobox-with-add"
                element={<CGComboboxWithAddDemo />}
              />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#ffffff",
              borderTop: "1px solid #d9d9d9",
              color: "#666666",
            }}
          >
            React App with CG Components ©2024
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
