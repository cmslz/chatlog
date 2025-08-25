import { makeAutoObservable } from 'mobx';
import type { Contact, ChatRoom, Session } from '../types/api';
import { contactApi, chatRoomApi, sessionApi } from '../utils/api';
import { mockChatRooms, mockContacts, mockSessions } from '../utils/mockData';

export class AppStore {
  contacts: Contact[] = [];
  chatRooms: ChatRoom[] = [];
  sessions: Session[] = [];
  
  loading = false;
  error: string | null = null;
  
  selectedContact: Contact | null = null;
  selectedChatRoom: ChatRoom | null = null;
  
  pagination = {
    page: 1,
    pageSize: 20,
    total: 0,
  };

  constructor() {
    makeAutoObservable(this);
    this.loadInitialData();
  }

  async loadInitialData() {
    this.loading = true;
    try {
      await Promise.all([
        this.loadSessions(),
        this.searchContacts(),
        this.loadChatRooms(),
      ]);
    } catch (error) {
      console.warn('API连接失败，使用模拟数据', error);
      // 使用基于真实API格式的模拟数据
      this.sessions = mockSessions;
      this.contacts = mockContacts;
      this.chatRooms = mockChatRooms;
      this.error = '当前使用模拟数据，请确保后端服务已启动以获取真实数据';
    } finally {
      this.loading = false;
    }
  }


  async loadChatRooms() {
    try {
      const response = await chatRoomApi.getChatRooms();
      this.chatRooms = response?.data.items || [];
    } catch (error) {
      console.warn('加载群聊失败，使用空数据', error);
      this.chatRooms = [];
    }
  }

  async loadSessions() {
    try {
      const response = await sessionApi.getSessions();
      this.sessions = response?.data.items || [];
    } catch (error) {
      console.warn('加载会话失败，使用空数据', error);
      this.sessions = [];
    }
  }

  async searchContacts(keyword?: string) {
    this.loading = true;
    try {
      const response = await contactApi.getContacts(keyword);
      this.contacts = response?.data.items || [];
    } catch (error) {
      console.warn('搜索联系人失败，使用空数据', error);
      this.contacts = [];
      this.error = error instanceof Error ? error.message : '搜索失败';
    } finally {
      this.loading = false;
    }
  }

  setSelectedContact(contact: Contact | null) {
    this.selectedContact = contact;
  }

  setSelectedChatRoom(chatRoom: ChatRoom | null) {
    this.selectedChatRoom = chatRoom;
  }

  clearError() {
    this.error = null;
  }
}

export const appStore = new AppStore();