import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout, Card, Row, Col, Spin, Typography } from '@douyinfe/semi-ui';
import { appStore } from '../stores/appStore';
import { useRequest } from 'ahooks';
import { systemApi } from '../utils/api';

const { Title } = Typography;

const Dashboard: React.FC = observer(() => {
  const { data: systemInfo, loading: systemLoading } = useRequest(() => systemApi.getStatus());
  
  useEffect(() => {
    appStore.loadInitialData();
  }, []);

  const stats = [
    {
      title: '总消息数',
      value: appStore.pagination.total,
      color: 'blue',
    },
    {
      title: '联系人',
      value: appStore.contacts.length,
      color: 'green',
    },
    {
      title: '群聊',
      value: appStore.chatRooms.length,
      color: 'orange',
    },
    {
      title: '最近会话',
      value: appStore.sessions.length,
      color: 'purple',
    },
  ];

  return (
    <Layout>
      <Layout.Header>
        <Title heading={3} style={{ margin: 0 }}>
          微信聊天记录管理
        </Title>
      </Layout.Header>
      
      <Layout.Content style={{ padding: '24px' }}>
        <Spin spinning={appStore.loading}>
          <Row gutter={16}>
            {stats.map((stat) => (
              <Col span={6} key={stat.title}>
                <Card>
                  <div>
                    <h4 style={{ margin: 0, color: `var(--semi-color-${stat.color})` }}>{stat.value}</h4>
                    <p style={{ margin: 0, color: 'var(--semi-color-text-2)' }}>{stat.title}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Card style={{ marginTop: 24 }}>
            <Title heading={4}>系统信息</Title>
            {systemLoading ? (
              <Spin />
            ) : systemInfo?.data?.data ? (
              <Row gutter={16}>
                <Col span={12}>
                  <p>状态: {systemInfo.data.data.status || '离线'}</p>
                  <p>版本: {systemInfo.data.data.version || '未知'}</p>
                </Col>
                <Col span={12}>
                  <p>API地址: http://localhost:5030</p>
                  <p>前端地址: http://localhost:3000</p>
                </Col>
              </Row>
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <p>状态: <span style={{color: 'red'}}>离线</span></p>
                  <p>版本: 未知</p>
                </Col>
                <Col span={12}>
                  <p>API地址: http://localhost:5030</p>
                  <p>前端地址: http://localhost:3000</p>
                </Col>
              </Row>
            )}
          </Card>
        </Spin>
      </Layout.Content>
    </Layout>
  );
});

export default Dashboard;