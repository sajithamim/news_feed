import React, { useState } from "react";
import "antd/dist/antd.css";
import "./AdminLayout.css";
import { Layout, Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { routes } from "../../Routes";
import { NavLink } from "react-router-dom";
import { logout } from '../../actions/auth';
import { useDispatch, useSelector } from "react-redux";
import "./logo.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const { user, isLoggedIn } = useSelector(state => {
    console.log("user selector" , state.auth.user)
    return state.auth;
  });


  const handleClick = () => {
    dispatch(logout())
  }



  const toggle = () => {
    setCollapsed(!collapsed)
  };

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
                {user !== null && isLoggedIn !== false ?
                  (<Menu
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
                            {subroute.key !== 'logout' ? (<Menu.Item key={subroute.key} icon={subroute.icon}> {subroute.title}
                            </Menu.Item>) : (<Button onClick={handleClick}>{subroute.title}</Button>)}

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
                  </Menu>) : null}
              </Sider>
            )
        )}
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
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//       handleLogout: () => {
//           dispatch(logout());
//       },
//   };
// };

export default AdminLayout;
