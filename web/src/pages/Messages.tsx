import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DatePicker } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react-lite';
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Tag,
  Avatar,
  Spin,
  Typography,
  Modal,
  Descriptions,
  Select,
} from '@douyinfe/semi-ui';
import { appStore } from '../stores/appStore';
import dayjs from 'dayjs';
import Label from '@douyinfe/semi-ui/lib/es/form/label';
import { ChatLogParams, Message } from '@/types/api';
import { messageApi } from '@/utils/api';

const { Title, Text } = Typography;

const Messages: React.FC = observer(() => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const [selectedTalker, setSelectedTalker] = useState<string | undefined>(undefined);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeRange, setTimeRange] = useState<string>('');
  const scroll = { y: 600 };
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pagination = useRef({
    current: 0,
    pageSize: 50,
  });
  const [list, setList] = useState<Message[]>([]);

  const itemSize = 64; // 每行的高度

  // 从URL查询参数中获取设置并应用默认值
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const talkerParam = queryParams.get('talker');
    const dateRangeParam = queryParams.get('date');
    
    // 设置聊天对象
    if (talkerParam) {
      setSelectedTalker(talkerParam);
    } else if (!selectedTalker && (appStore.contacts.length > 0 || appStore.chatRooms.length > 0)) {
      // 如果没有选择聊天对象且有可用聊天对象，默认选择第一个
      const firstContact = appStore.contacts[0];
      const firstChatRoom = appStore.chatRooms[0];
      if (firstContact) {
        setSelectedTalker(firstContact.userName);
      } else if (firstChatRoom) {
        setSelectedTalker(firstChatRoom.name);
      }
    }

    // 设置日期范围
    if (dateRangeParam) {
      setTimeRange(dateRangeParam);
    } else if (!dateRangeParam && !timeRange) {
      // 如果没有设置日期范围，默认使用最近7天
      const endDate = dayjs().format('YYYY-MM-DD');
      const startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
      setTimeRange(`${startDate}~${endDate}`);
    }
  }, [location.search, appStore.contacts, appStore.chatRooms]);

  // 当聊天对象或时间范围发生变化时执行搜索
  useEffect(() => {
    if (selectedTalker && timeRange) {
      loadMessages();
    }
  }, [selectedTalker, timeRange]);

  const handleTalkerChange = (value: string) => {
    setSelectedTalker(value || undefined);
  };
  
  useEffect(() => {
    if(selectedTalker && timeRange) {
      loadMessages(pagination.current.current > 0);
    }
  }, [pagination.current])

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
      sorter: (a: any, b: any) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf(),
    },
    {
      title: '发送者',
      dataIndex: 'senderName',
      key: 'sender',
      render: (text: string, record: any) => (
        <Space>
          <Avatar size="small">{text?.[0] || '?'}</Avatar>
          <Text>{text || record.sender}</Text>
          {record.isSelf && <Tag color="blue">我</Tag>}
        </Space>
      ),
    },
    {
      title: '聊天对象',
      dataIndex: 'talkerName',
      key: 'talker',
      render: (text: string, record: any) => (
        <Space>
          <Text>{text || record.talker}</Text>
          {record.isChatRoom && <Tag color="green">群聊</Tag>}
        </Space>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <Text ellipsis={{ showTooltip: true }} style={{ maxWidth: 300 }}>
          {text}
        </Text>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => {
        const typeMap: Record<number, string> = {
          1: '文本',
          3: '图片',
          34: '语音',
          43: '视频',
          49: '分享',
          10000: '系统',
        };
        return <Tag>{typeMap[type] || type}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_:any, record: any) => (
        <Button
          type="tertiary"
          size="small"
          onClick={() => {
            setSelectedMessage(record);
            setModalVisible(true);
          }}
        >
          详情
        </Button>
      ),
    },
  ];

  
  const loadMessages = async (append: boolean = false) => {
    try {
      const response = await messageApi.getMessages({
        talker: selectedTalker!,
        limit: pagination.current.pageSize,
        offset: (pagination.current.current - 1) * pagination.current.pageSize,
        time: timeRange
      });
      
      const newMessages = response?.data || [];
      if (append) {
        setList(prev => [...prev, ...newMessages]);
      } else {
        setList(newMessages);
      }
    } catch (error) {
      console.warn('加载消息失败，使用空数据', error);
      if (!append) {
        // 只有在不是追加数据时才清空现有数据
        setList([]);
        return
      }
      pagination.current.current = 0;
    } finally {
      setIsLoadingMore(false);
    }
  }


  return (
    <Layout>
      <Layout.Header>
        <Title heading={3} style={{ margin: 0 }}>
          消息记录
        </Title>
      </Layout.Header>
      
      <Layout.Content style={{ padding: '24px' }}>
        <Space style={{ marginBottom: 16 }} align="center">
          <Select
            placeholder={appStore.loading ? "加载中..." : "选择聊天对象"}
            style={{ width: 200 }}
            value={selectedTalker}
            onChange={(value: string | number | any[] | Record<string, any> | undefined) => handleTalkerChange(value as string)}
            filter={(inputValue, option) => {
              if (!option || !option.label || !option.value) return false;
              const label = option.label.toString().toLowerCase();
              const value = option.value.toString().toLowerCase();
              const input = inputValue.toLowerCase();
              // 支持通过wxid、群ID、备注名或昵称多种方式匹配
              return label.includes(input) || value.includes(input);
            }}
          >
            <Select.OptGroup label={`联系人 (${appStore.contacts.length})`}>
              {appStore.contacts.map(contact => (
                <Select.Option key={'contact_'+contact.userName} value={contact.userName}>
                  {contact.remark || contact.nickName || contact.userName}
                </Select.Option>
              ))}
            </Select.OptGroup>
            <Select.OptGroup label={`群聊 (${appStore.chatRooms.length})`}>
              {appStore.chatRooms.map(chatRoom => (
                <Select.Option key={'chatRoom_' + chatRoom.name} value={chatRoom.name}>
                  {chatRoom.remark || chatRoom.nickName || chatRoom.name}
                </Select.Option>
              ))}
            </Select.OptGroup>
            {appStore.contacts.length === 0 && appStore.chatRooms.length === 0 && (
              <Select.Option disabled value="">
                无可用聊天对象
              </Select.Option>
            )}
          </Select>
          <DatePicker
              placeholder="选择时间范围 (2023-01-01~2023-01-31)"
              type="dateRange"
              value={timeRange ? timeRange.split('~') : []}
              showClear={false}
              onChange={(dates) => {
                if (dates && Array.isArray(dates) && dates.length === 2) {
                  setTimeRange(`${dayjs(dates[0]).format('YYYY-MM-DD')}~${dayjs(dates[1]).format('YYYY-MM-DD')}`);
                } else {
                  // 如果没有设置日期范围，默认使用最近7天
                  const endDate = dayjs().format('YYYY-MM-DD');
                  const startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
                  setTimeRange(`${startDate}~${endDate}`);
                }
              }}
            />
          <Input
            placeholder="搜索消息内容..."
            value={searchText}
            onChange={(e) => setSearchText(e)}
            style={{ width: 200 }}
            onKeyDown={(e) => e.key === 'Enter' && loadMessages(false)}
          />
          <Button type="primary" onClick={() => loadMessages(false)}>
            搜索
          </Button>
          <Text type="secondary" style={{ fontSize: 12 }}>
            联系人: {appStore.contacts.length} | 群聊: {appStore.chatRooms.length}
          </Text>
        </Space>
        
        <Spin spinning={appStore.loading}>
          <Table
            columns={columns}
            dataSource={list}
            scroll={scroll}
            pagination={false}
            virtualized={{
              itemSize,
              onScroll: ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) => {
                if (
                  scrollDirection === 'forward' &&
                  scrollOffset && scrollOffset >= (list.length - Math.ceil(scroll.y / itemSize) * 1.5) * itemSize &&
                  !scrollUpdateWasRequested
                ) {
                  pagination.current.current += 1
                  loadMessages(true);
                }
              },
            }}
            rowKey="seq"
          />
        </Spin>
        
        <Modal
          title="消息详情"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={
            <Button onClick={() => setModalVisible(false)}>关闭</Button>
          }
        >
          {selectedMessage && (
            <Descriptions column={1}>
              <Descriptions.Item>
                <Label>时间</Label>
                {dayjs(selectedMessage.time).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>发送者</Label>
                {selectedMessage.senderName || selectedMessage.sender}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>聊天对象</Label>
                {selectedMessage.talkerName || selectedMessage.talker}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>内容</Label>
                {selectedMessage.content}
              </Descriptions.Item>
              <Descriptions.Item>
                <Label>类型</Label>
                {selectedMessage.type}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Layout.Content>
    </Layout>
  );
});

export default Messages;