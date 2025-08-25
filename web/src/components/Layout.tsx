import React, { useState } from 'react';
import { Layout as SemiLayout, Nav, Avatar, Dropdown, Button } from '@douyinfe/semi-ui';
import {
  IconHome,
  IconComment,
  IconUser,
  IconSetting,
  IconUserGroup,
} from '@douyinfe/semi-icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider, Header, Content } = SemiLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      itemKey: '/dashboard',
      text: '仪表盘',
      icon: <IconHome size="large" />,
      path: '/dashboard',
    },
    {
      itemKey: '/messages',
      text: '消息记录',
      icon: <IconComment size="large" />,
      path: '/messages',
    },
    {
      itemKey: '/contacts',
      text: '联系人',
      icon: <IconUser size="large" />,
      path: '/contacts',
    },
    {
      itemKey: '/chatrooms',
      text: '群聊',
      icon: <IconUserGroup size="large" />,
      path: '/chatrooms',
    },
  ];

  const handleSelect = (data: any) => {
    // Navigation is handled by Link component
  };

  const userDropdown = (
    <Dropdown
      trigger="click"
      render={
        <Dropdown.Menu>
          <Dropdown.Item>个人设置</Dropdown.Item>
          <Dropdown.Item>退出登录</Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Avatar color="blue" size="small">
        用户
      </Avatar>
    </Dropdown>
  );

  return (
    <SemiLayout style={{ minHeight: '100vh' }}>
      <Sider
        style={{ backgroundColor: 'var(--semi-color-bg-1)' }}
      >
        <Nav
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          items={navItems.map((item) => ({
            ...item,
            text: collapsed ? null : item.text,
            icon: item.icon,
          }))}
          onSelect={handleSelect}
          style={{ maxWidth: 220, height: '100%' }}
          header={{
            text: collapsed ? 'CL' : 'ChatLog',
            logo: <IconHome style={{ fontSize: 36 }} />,
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Sider>
      
      <SemiLayout>
        <Header
          style={{
            backgroundColor: 'var(--semi-color-bg-1)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  marginRight: 24,
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.text}
              </Link>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              icon={<IconSetting />}
              type="tertiary"
              theme="borderless"
              onClick={() => window.open('http://localhost:5030', '_blank')}
            >
              系统设置
            </Button>
            {userDropdown}
          </div>
        </Header>
        
        <Content
          style={{
            margin: '24px',
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
            borderRadius: '6px',
          }}
        >
          {children}
        </Content>
      </SemiLayout>
    </SemiLayout>
  );
};

export default AppLayout;