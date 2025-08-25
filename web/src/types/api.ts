export interface Message {
  seq: number;
  time: string;
  talker: string;
  talkerName: string;
  isChatRoom: boolean;
  sender: string;
  senderName: string;
  isSelf: boolean;
  type: number;
  subType: number;
  content: string;
  format?:string;
  contents?: Record<string, any>;
}

export interface Contact {
  userName: string; // 对应API的userName字段
  alias: string;    // 对应API的alias字段
  nickName: string; // 对应API的nickName字段
  remark: string;   // 对应API的remark字段
  isFriend: boolean; // 对应API的isFriend字段
  avatar?: string;  // 可选字段
  sex?: number;     // 可选字段
  signature?: string; // 可选字段
  province?: string;  // 可选字段
  city?: string;      // 可选字段
  format?: string;
}

export interface ChatRoom {
  name: string; // 对应API的name字段
  owner: string; // 对应API的owner字段
  users: ChatRoomUser[]; // 对应API的users数组
  remark: string;
  nickName: string;
  format?:string;
}

export interface ChatRoomUser {
  userName: string;
  displayName: string;
}

export interface Session {
  talker: string;
  msgCount: number;
  lastMsgTime: string;
  lastMsgContent: string;
  talkerName: string;
  format?:string;
  isChatRoom: boolean;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ChatLogParams {
  format?: string;
  limit?: number;
  offset?: number;
  time: string;
  talker: string;
  keyword?: string
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}