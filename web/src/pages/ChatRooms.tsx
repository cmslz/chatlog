import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout, Input, Empty, Space, Typography } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { appStore } from '../stores/appStore';
import ChatRoomCard from '../components/ChatRoomCard';
import { ChatRoom } from '../types/api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ChatRooms: React.FC = observer(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    appStore.loadChatRooms();
  }, []);

  useEffect(() => {
    const filtered = appStore.chatRooms.filter((room)=>{
      if(!room.users ||  room.users.length === 0){
        return false;
      }
      return room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.nickName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.users.some(user => user.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    setFilteredRooms(filtered);
  }, [searchTerm, appStore.chatRooms]);

  const handleRoomClick = (room: ChatRoom) => {
    // 可以在这里添加点击群聊后的逻辑
    navigate('/messages?talker=' + room.name)
  };

  return (
    <Layout>
      <Layout.Header>
        <Title heading={3} style={{ margin: 0 }}>
          群聊管理 ({filteredRooms.length})
        </Title>
      </Layout.Header>

      <Layout.Content style={{ padding: '24px' }}>
        <Space vertical style={{ width: '100%' }}>
          <Input 
            prefix={<IconSearch />} 
            showClear 
            placeholder="搜索群聊名称、昵称或成员..."
            value={searchTerm}
            onChange={setSearchTerm}
            style={{ width: 300, marginBottom: 16 }}
          />

          {filteredRooms.length === 0 ? (
            <Empty
              title={searchTerm ? "未找到匹配的群聊" : "暂无群聊数据"}
              description={
                searchTerm 
                  ? "请尝试其他搜索关键词"
                  : "请确保后端服务已启动并包含群聊数据"
              }
            />
          ) : (
            <div style={{ maxWidth: 800 }}>
              {filteredRooms.map(room => (
                <div key={'filteredRooms'+room.name} onClick={() => handleRoomClick(room)}>
                  <ChatRoomCard 
                    key={room.name} 
                    chatRoom={room} 
                    onClick={handleRoomClick}
                  />
                </div>
              ))}
            </div>
          )}
        </Space>
      </Layout.Content>
    </Layout>
  );
});

export default ChatRooms;