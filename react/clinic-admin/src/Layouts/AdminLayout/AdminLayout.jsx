import React from "react";
import "antd/dist/antd.css";
import "./AdminLayout.css";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { routes } from "../../Routes";
import { NavLink } from "react-router-dom";
import "./logo.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        {routes &&
          routes.map(
            (route) =>
              route.layout &&
              route.layout === "/admin" && (
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
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
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{ height: "100%" }}
                  >
                    {route.subNav && route.subNav.length > 0 ? (
                      <SubMenu
                        key={route.key}
                        icon={route.icon}
                        title={route.title}
                      >
                        {route.subNav.map((subroute) => (
                          <NavLink
                            key={subroute.key}
                            to={subroute.path}
                            style={{ textDecoration: "none" }}
                          >
                            <Menu.Item key={subroute.key} icon={subroute.icon}>
                              {subroute.title}
                            </Menu.Item>
                          </NavLink>
                        ))}
                      </SubMenu>
                    ) : (
                      <NavLink
                        key={route.key}
                        to={route.path}
                        style={{ textDecoration: "none" }}
                      >
                        <Menu.Item key={route.key} icon={route.icon}>
                          {route.title}
                        </Menu.Item>
                      </NavLink>
                    )}
                  </Menu>
                </Sider>
              )
          )}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
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
            {React.Children.map(this.props.children, (child) =>
              React.cloneElement(child)
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default AdminLayout;
