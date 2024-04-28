import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from "react-router-dom";
import { BILL_PATH, CATEGORY_PATH, HOME_PATH, PRODUCT_PATH, USER_PATH } from "../urls";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem(<Link to={HOME_PATH}>Bán Hoa</Link>, "1", <FileOutlined />),
  getItem(
    <Link to={BILL_PATH}>Quản lý đơn hàng</Link>,
    "2",
    <PieChartOutlined />
  ),
  getItem(
    <Link to={PRODUCT_PATH}>Quản lý sản phẩm</Link>,
    "3",
    <DesktopOutlined />
  ),
  getItem(
    <Link to={HOME_PATH}>Quản lý danh muc</Link>,
    "sub1",
    <UserOutlined />,
    [
      getItem(<Link to={CATEGORY_PATH}>Danh mục hoa </Link>, "4"),
     
    ]
  ),
  getItem(
    <Link to={HOME_PATH}>Thông kê báo cáo</Link>,
    "sub2",
    <TeamOutlined />,
    [
      getItem(<Link to={HOME_PATH}>Sản phẩm bán chạy</Link>, "5"),
      getItem(<Link to={HOME_PATH}>Doanh thu</Link>, "6"),
    ]
  ),
  getItem(
    <Link to={USER_PATH}>Quản lý người dùng</Link>,
    "9",
    <FileOutlined />
  ),
];

interface Props {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: Props): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout  style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items}  />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

