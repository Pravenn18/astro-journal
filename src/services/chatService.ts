// Chat Service - Phase 2 Implementation
// This service will handle real-time messaging functionality

import { WEBSOCKET_CONFIG } from '../config/features';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderZodiacSign: string;
  content: string;
  timestamp: Date;
  roomId: string;
  messageType: 'text' | 'image' | 'voice' | 'file';
  isEdited: boolean;
  isDeleted: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'zodiac';
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  zodiacSign: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
}

export class ChatService {
  private static instance: ChatService;
  private wsConnection: WebSocket | null = null;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private connectionHandlers: ((connected: boolean) => void)[] = [];

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Initialize WebSocket connection
  async connect(userId: string): Promise<void> {
    try {
      this.wsConnection = new WebSocket(`${WEBSOCKET_CONFIG.chat}?userId=${userId}`);
      
      this.wsConnection.onopen = () => {
        console.log('Chat WebSocket connected');
        this.notifyConnectionChange(true);
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const message: ChatMessage = JSON.parse(event.data);
          this.handleIncomingMessage(message);
        } catch (error) {
          console.error('Error parsing chat message:', error);
        }
      };

      this.wsConnection.onclose = () => {
        console.log('Chat WebSocket disconnected');
        this.notifyConnectionChange(false);
        // Implement reconnection logic
        this.scheduleReconnection();
      };

      this.wsConnection.onerror = (error) => {
        console.error('Chat WebSocket error:', error);
        this.notifyConnectionChange(false);
      };
    } catch (error) {
      console.error('Failed to connect to chat service:', error);
      throw error;
    }
  }

  // Send a message
  async sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<void> {
    if (!this.wsConnection || this.wsConnection.readyState !== WebSocket.OPEN) {
      throw new Error('Chat connection not available');
    }

    const fullMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    this.wsConnection.send(JSON.stringify(fullMessage));
  }

  // Join a chat room
  async joinRoom(roomId: string): Promise<void> {
    if (!this.wsConnection || this.wsConnection.readyState !== WebSocket.OPEN) {
      throw new Error('Chat connection not available');
    }

    const joinMessage = {
      type: 'join_room',
      roomId,
    };

    this.wsConnection.send(JSON.stringify(joinMessage));
  }

  // Leave a chat room
  async leaveRoom(roomId: string): Promise<void> {
    if (!this.wsConnection || this.wsConnection.readyState !== WebSocket.OPEN) {
      throw new Error('Chat connection not available');
    }

    const leaveMessage = {
      type: 'leave_room',
      roomId,
    };

    this.wsConnection.send(JSON.stringify(leaveMessage));
  }

  // Subscribe to incoming messages
  onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.push(handler);
    
    return () => {
      const index = this.messageHandlers.indexOf(handler);
      if (index > -1) {
        this.messageHandlers.splice(index, 1);
      }
    };
  }

  // Subscribe to connection status changes
  onConnectionChange(handler: (connected: boolean) => void): () => void {
    this.connectionHandlers.push(handler);
    
    return () => {
      const index = this.connectionHandlers.indexOf(handler);
      if (index > -1) {
        this.connectionHandlers.splice(index, 1);
      }
    };
  }

  // Handle incoming messages
  private handleIncomingMessage(message: ChatMessage): void {
    this.messageHandlers.forEach(handler => handler(message));
  }

  // Notify connection status changes
  private notifyConnectionChange(connected: boolean): void {
    this.connectionHandlers.forEach(handler => handler(connected));
  }

  // Schedule reconnection attempt
  private scheduleReconnection(): void {
    setTimeout(() => {
      console.log('Attempting to reconnect to chat service...');
      // Implement reconnection logic here
    }, WEBSOCKET_CONFIG.reconnectDelay);
  }

  // Disconnect from chat service
  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  // Get chat rooms for a user
  async getChatRooms(userId: string): Promise<ChatRoom[]> {
    // This will be implemented with actual API calls
    return [];
  }

  // Get chat history for a room
  async getChatHistory(roomId: string, limit: number = 50): Promise<ChatMessage[]> {
    // This will be implemented with actual API calls
    return [];
  }

  // Create a new chat room
  async createChatRoom(room: Omit<ChatRoom, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatRoom> {
    // This will be implemented with actual API calls
    throw new Error('Not implemented yet');
  }
}

export default ChatService;
