export interface Message {
  message_id: string;
  message_chat_id: string;
  sender_id: string;
  content: string;
  created_at: Date;
  is_read: boolean;
}

export interface Chat {
  chat_id: string;
  user1_id: string;
  user2_id: string;
  is_archived: boolean;
  is_open: boolean;
  last_message_id: string;
  messages: Message[];
}

export type ChatPreviewType = Pick<
  Chat,
  "chat_id" | "user1_id" | "user2_id" | "is_archived" | "is_open"
> & {
  last_message_content: Message["content"];
  last_message_at: Message["created_at"];
  last_message_is_read: Message["is_read"];
  last_message_sender_id: Message["sender_id"];
};
