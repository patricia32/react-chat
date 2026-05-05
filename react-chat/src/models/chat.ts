interface Message {
  messageId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Chat {
  chatId: string;
  userIds: string[];
  messages: Message[];
  lastMessageContent: string;
  lastMessageIsRead: boolean;
}
