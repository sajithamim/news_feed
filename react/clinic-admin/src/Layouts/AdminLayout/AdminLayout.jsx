import React, { useState } from "react";
import "antd/dist/antd.css";
import "./AdminLayout.css";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { routes } from "../../Routes";
import { NavLink } from "react-router-dom";
import { logout } from '../../actions/auth';
import { useDispatch } from "react-redux";
import "./logo.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const handleClick = () => {
    dispatch(logout())
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout>
      <Sider
        key={routes}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="sidebar-logo">
          <a href="/">
            <img
              src="https://ng.ant.design/assets/img/logo.svg"
              alt="logo"
            />
            <h1>Clinic Topics - Admin</h1>
          </a>
        </div>
        {accessToken !== null && accessToken !== undefined ? 
          (<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }}>
            {routes && routes.map((subroute) => subroute.key !== 'logout' ? subroute.key !== 'settings' ?
              (<NavLink key={subroute.key} to={subroute.path} style={{ textDecoration: "none" }}>
                <Menu.Item icon={subroute.icon}> {subroute.title}
                </Menu.Item>
              </NavLink>) :
              (<NavLink key={subroute.key} to={subroute.path} style={{ textDecoration: "none" }}>
                <SubMenu key={subroute.key} icon={subroute.icon} title={subroute.title}>
                {subroute.subNav.map((subItem) => (
                  <NavLink key={subItem.key} to={subItem.path} style={{ textDecoration: "none" }}>
                    <Menu.Item key={subItem.key} icon={subItem.icon}>{subItem.title}</Menu.Item>
                  </NavLink>
                ))}
                </SubMenu>
              </NavLink>) :
              (<NavLink key={subroute.key} to={subroute.path} style={{ textDecoration: "none" }}>
              <Menu.Item icon={subroute.icon} onClick={handleClick}>{subroute.title}</Menu.Item>
            </NavLink>)
          )}
          </Menu>) : null }
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 500,
          }}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child)
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
