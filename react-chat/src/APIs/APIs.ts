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
  const response = await fetch("http://localhost:3000/chatPreviews");
  if (!response.ok) throw new Error("Could not fetch chat previews");

  const chatPreviewsData: ChatPreviewType[] = await response.json();
  return chatPreviewsData;
}

export async function getChatIdByUserIds(
  secondaryUserId: string,
): Promise<string> {
  const response = await fetch(
    `http://localhost:3000/chat/${loggedUser.id}/${secondaryUserId}`,
  );
  if (!response.ok) throw new Error("Could not fetch chat id");

  const data: string = await response.json();
  return data;
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

export async function getChatByID(chatId: string): Promise<Chat> {
  const response = await fetch(`http://localhost:3000/chat/${chatId}`);
  if (!response.ok) throw new Error("Could not fetch chat data");

  const data: Chat = await response.json();
  return data;
}

export const sendMessageAPI = async (
  text: string,
  chatId: string,
): Promise<Message> => {
  const response = await fetch(`http://localhost:3000/sendMessage/${chatId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      senderId: loggedUser.id,
      text,
    }),
  });
  const data: Message = await response.json();
  return data;
};
