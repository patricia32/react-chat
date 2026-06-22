import { loggedUser } from "../mocks/loggedUser";
import type { Chat, ChatPreviewType, Message } from "../models/chat";
import type { User } from "../models/user";

export async function getUserByIdAPI(userId: string): Promise<User> {
  const response = await fetch(`http://localhost:3000/getUserById/${userId}`);
  if (!response.ok) throw new Error(`Could not fetch user with id ${userId}`);

  const userByIdData: User = await response.json();
  return userByIdData;
}

export async function getActiveUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3000/getActiveUsers");
  if (!response.ok) throw new Error("Could not fetch active users");

  const activeUsersData: User[] = await response.json();
  return activeUsersData;
}

export async function getChatPreviews(): Promise<ChatPreviewType[]> {
  const response = await fetch(
    `http://localhost:3000/chatPreviews/${loggedUser.user_id}`,
  );
  if (!response.ok) throw new Error("Could not fetch chat previews");

  const chatPreviewsData: ChatPreviewType[] = await response.json();
  return chatPreviewsData;
}

export async function getChatMessages(chat_id: string): Promise<Message[]> {
  const response = await fetch(
    `http://localhost:3000/chat/getMessages/${chat_id}`,
  );
  if (!response.ok) throw new Error("Could not fetch chat messages");

  const messages: Message[] = await response.json();
  return messages;
}

export async function getChatIdByUserIds(
  secondaryUserId: string,
): Promise<string | null> {
  const response = await fetch(
    `http://localhost:3000/chat/getChatIdByUserIds/${loggedUser.user_id}/${secondaryUserId}`,
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Could not fetch chat id");

  const data = await response.json();
  return data.chat_id;
}

export async function createNewChat(userIds: string[]): Promise<string> {
  const response = await fetch(`http://localhost:3000/chat/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userIds: userIds,
    }),
  });

  const data: string = await response.json();
  return data;
}

export async function getChatByID(chat_id: string): Promise<Chat> {
  const response = await fetch(
    `http://localhost:3000/chat/getChatById/${chat_id}`,
  );
  if (!response.ok) throw new Error("Could not fetch chat data");

  const data: Chat = await response.json();
  return data;
}

export async function markChatAsReadAPI(
  chat_id: string,
  second_user_id: string,
) {
  const response = await fetch(
    `http://localhost:3000/chat/markAsRead/${chat_id}/${second_user_id}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    },
  );

  if (!response.ok) throw new Error("Could not mark chat as read.");

  const data = await response.json();
  return data;
}

export const sendMessageAPI = async (
  content: string,
  chat_id: string,
): Promise<Message> => {
  const response = await fetch(`http://localhost:3000/sendMessage/${chat_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender_id: loggedUser.user_id,
      content,
    }),
  });
  const data: Message = await response.json();
  return data;
};
