import axios from 'axios';
import type { Message, Contact, ChatRoom, Session, ApiResponse, ChatLogParams as ChatLogParams } from '../types/api';

const api = axios.create({
  baseURL: '/wechatlog',
  timeout: 10000,
});

export const messageApi = {
  getMessages: (params: ChatLogParams) =>
    api.get<Message[]>('/api/v1/chatlog', { params: { format: 'json', ...params } }),
};

export const contactApi = {
  getContacts: (keyword?: string) =>
    api.get<{ items: Contact[] }>('/api/v1/contact', { params: { format: 'json', keyword } }),
};

export const chatRoomApi = {
  getChatRooms: (keyword?: string) =>
    api.get<{ items: ChatRoom[] }>('/api/v1/chatroom', { params: { format: 'json', keyword } }),
};

export const sessionApi = {
  getSessions: () =>
    api.get<{ items: Session[] }>('/api/v1/session', { params: { format: 'json' } }),
};

export const systemApi = {
  getStatus: () => api.get<ApiResponse<{ status: string; version: string }>>('/api/v1/status', { params: { format: 'json' } }),
};

export default api;