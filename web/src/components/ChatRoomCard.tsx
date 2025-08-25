import React from 'react';
import { Card, Avatar, Tag, Space, Typography, Button } from '@douyinfe/semi-ui';
import { ChatRoom } from '../types/api';
import { IconUserGroup, IconCrown } from '@douyinfe/semi-icons';

const { Title, Text } = Typography;

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  onClick?: (chatRoom: ChatRoom) => void;
}

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ chatRoom, onClick }) => {
  const users = chatRoom.users || [];
  const owner = users.find(user => user.userName === chatRoom.owner);
  const memberCount = users.length;

  return (
    <Card
      style={{ marginBottom: 16, cursor: onClick ? 'pointer' : 'default' }}
    >
      <Space align="start">
        <Avatar 
          size="large" 
          color="blue" 
          style={{ marginRight: 12 }}
        >
          <IconUserGroup />
        </Avatar>
        
        <Space vertical align="start" style={{ flex: 1 }}>
          <div>
            <Title heading={5} style={{ margin: 0, marginBottom: 4 }}>
              {chatRoom.name}
            </Title>
            {chatRoom.nickName && (
              <Text type="secondary" style={{ fontSize: 14 }}>
                {chatRoom.nickName}
              </Text>
            )}
          </div>

          <Space>
            <Tag color="blue" size="small">
              {memberCount} 人
            </Tag>
            
            {chatRoom.remark && (
              <Tag color="light-blue" size="small">
                {chatRoom.remark}
              </Tag>
            )}

            {owner && (
              <Tag color="orange" size="small" prefixIcon={<IconCrown />}>
                群主: {owner.displayName || owner.userName}
              </Tag>
            )}
          </Space>

          <Space vertical align="start" style={{ marginTop: 8 }}>
            <Text type="tertiary" style={{ fontSize: 12 }}>
              群成员:
            </Text>
            <Space wrap>
              {users.slice(0, 3).map((user) => (
                <Tag 
                  key={'chatRoomCard'+ (user.userName || user.displayName)} 
                  size="small" 
                  type="ghost"
                  color={user.userName === chatRoom.owner ? "orange" : "green"}
                >
                  {user.displayName || user.userName}
                  {user.userName === chatRoom.owner && " (群主)"}
                </Tag>
              ))}
              {users.length > 5 && (
                <Tag size="small" type="ghost">+{users.length - 3}人</Tag>
              )}
            </Space>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default ChatRoomCard;