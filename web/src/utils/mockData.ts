import { ChatRoom, Contact, Message, Session } from '../types/api';

// 基于用户提供的真实API响应数据创建的模拟数据
export const mockChatRooms: ChatRoom[] = [
  {
    name: "1055587848@chatroom",
    owner: "QIANG1476406650",
    users: [
      {
        userName: "QIANG1476406650",
        displayName: "杰"
      },
      {
        userName: "wxid_jwocqkmuprp921",
        displayName: "何艳花"
      }
    ],
    remark: "技术交流群",
    nickName: "前端开发群",
    format: "json"
  },
  {
    name: "1234567890@chatroom",
    owner: "user123",
    users: [
      {
        userName: "user123",
        displayName: "张三"
      },
      {
        userName: "user456",
        displayName: "李四"
      },
      {
        userName: "user789",
        displayName: "王五"
      }
    ],
    remark: "日常聊天",
    nickName: "好友群",
    format: "json"
  }
];

export const mockContacts: Contact[] = [
  {
    userName: "QIANG1476406650",
    alias: "jie",
    nickName: "杰",
    remark: "技术大佬",
    isFriend: true,
    avatar: "",
    sex: 1,
    signature: "专注于前端开发",
    province: "广东",
    city: "深圳"
  },
  {
    userName: "wxid_jwocqkmuprp921",
    alias: "hyh",
    nickName: "何艳花",
    remark: "设计师",
    isFriend: true,
    avatar: "",
    sex: 2,
    signature: "UI/UX设计师",
    province: "广东",
    city: "广州"
  }
];

export const mockMessages: Message[] = [
  {
    seq: 1,
    time: "2024-01-15 10:30:00",
    talker: "1055587848@chatroom",
    talkerName: "前端开发群",
    isChatRoom: true,
    sender: "QIANG1476406650",
    senderName: "杰",
    isSelf: false,
    type: 1,
    subType: 0,
    content: "大家今天代码review准备好了吗？",
    format: "json"
  },
  {
    seq: 2,
    time: "2024-01-15 10:32:00",
    talker: "1055587848@chatroom",
    talkerName: "前端开发群",
    isChatRoom: true,
    sender: "wxid_jwocqkmuprp921",
    senderName: "何艳花",
    isSelf: false,
    type: 1,
    subType: 0,
    content: "我这边UI设计稿已经更新好了",
    format: "json"
  }
];

export const mockSessions: Session[] = [
  {
    talker: "1055587848@chatroom",
    msgCount: 156,
    lastMsgTime: "2024-01-15 10:35:00",
    lastMsgContent: "好的，下午3点开始review",
    talkerName: "前端开发群",
    isChatRoom: true,
    format: "json"
  }
];