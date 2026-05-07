export interface Message {
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
  openedChat: boolean;
}

export type ChatPreviewType = Pick<
  Chat,
  | "chatId"
  | "userIds"
  | "lastMessageContent"
  | "lastMessageIsRead"
  | "openedChat"
>;
