import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Avatar,
  Tag,
  Typography,
  Modal,
  Descriptions,
  List,
  Spin,
} from '@douyinfe/semi-ui';
import { appStore } from '../stores/appStore';
import Label from '@douyinfe/semi-ui/lib/es/form/label';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Contacts: React.FC = observer(() => {
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
  };

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text:any, record: any) => (
        <Avatar size="default" src={record.avatar || undefined}>
          {record.nickName?.[0] || record.userName?.[0] || '?'}
        </Avatar>
      ),
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text: string, record: any) => (
        <Text strong>{text || record.userName}</Text>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => {
        const typeMap: Record<number, string> = {
          1: '好友',
          2: '公众号',
          3: '群聊',
          4: '企业微信',
        };
        return <Tag color="blue">{typeMap[type] || type}</Tag>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text: string) => text || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_:any, record: any) => (
        <Space>
          <Button
            type="tertiary"
            size="small"
            onClick={() => {
              setSelectedContact(record);
              setModalVisible(true);
            }}
          >
            详情
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              navigate('/messages?talker=' + record.userName)
            }}
          >
            查看消息
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Layout.Header>
        <Title heading={3} style={{ margin: 0 }}>
          联系人管理
        </Title>
      </Layout.Header>
      
      <Layout.Content style={{ padding: '24px' }}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="搜索联系人..."
            value={searchText}
            onChange={(e) => setSearchText(e)}
            style={{ width: 300 }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        
        <Spin spinning={appStore.loading}>
          <Table
            columns={columns}
            dataSource={appStore.contacts}
            pagination={{
              pageSize: 20,
              showSizeChanger: false,
            }}
            rowKey="userName"
          />
        </Spin>
        
        <Modal
          title="联系人详情"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={
            <Button onClick={() => setModalVisible(false)}>关闭</Button>
          }
        >
          {selectedContact && (
            <Descriptions column={1}>
              <Descriptions.Item>
                <Label>头像</Label>
                <Avatar
                  size="large"
                  src={selectedContact.avatar || undefined}
                >
                  {selectedContact.nickName?.[0] || selectedContact.userName?.[0] || '?'}
                </Avatar>
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>昵称</Label>
                {selectedContact.nickName || selectedContact.userName}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>用户名</Label>
                {selectedContact.userName}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>类型</Label>
                {selectedContact.type === 1 ? '好友' : 
                 selectedContact.type === 2 ? '公众号' :
                 selectedContact.type === 3 ? '群聊' : '其他'}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>备注</Label>
                {selectedContact.remark || '-'}
              </Descriptions.Item>
              {selectedContact.signature && (
                <Descriptions.Item>
                  <Label>个性签名</Label>
                  {selectedContact.signature}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </Layout.Content>
    </Layout>
  );
});

export default Contacts;