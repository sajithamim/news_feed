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
  const [selectedMenuItem, setSelectedMenuItem]= useState('item1');
  const accessToken = localStorage.getItem("accessToken");

  const handleClick = () => {
    dispatch(logout())
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const pathname = window.location.pathname;
  const defaultKey = pathname.split('/');
  let selectedKey = '';
  let openKey = ''
  if(defaultKey[1] == 'userdetails')
  selectedKey = 'users';
  else if(defaultKey[1] == 'sub_specialization')
  selectedKey = 'specializations';
  else if(defaultKey[1] == 'advisory_board')
  selectedKey = 'specializations'; 
  else if(defaultKey[1] == 'privacy_policy')
    openKey = 'settings';
  else if(defaultKey[1] == 'terms')
    openKey = 'settings';
  else if(defaultKey[1] == 'contact')
    openKey = 'settings';
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
          (<Menu theme="dark" mode="inline" defaultOpenKeys={['openKey']} defaultSelectedKeys={[selectedKey]} style={{ height: "100%"}}>
            {routes && routes.map((subroute) => subroute.key !== 'logout' ? subroute.key !== 'settings' ?
              (<Menu.Item key={subroute.key} icon={subroute.icon}>
                <NavLink to={subroute.path} style={{ textDecoration: "none" }}>{subroute.title}</NavLink>
              </Menu.Item>) :
              (<SubMenu key={subroute.key} icon={subroute.icon} title={subroute.title}>
                {subroute.subNav.map((subItem) => (
                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                      <NavLink key={subItem.key} to={subItem.path} style={{ textDecoration: "none" }}>{subItem.title}</NavLink>
                    </Menu.Item>
                ))}
                </SubMenu>) :
              (<Menu.Item key={subroute.key} icon={subroute.icon} onClick={handleClick}>
                <NavLink key={subroute.key} to={subroute.path} style={{ textDecoration: "none" }}>{subroute.title}</NavLink>
                </Menu.Item>)
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
