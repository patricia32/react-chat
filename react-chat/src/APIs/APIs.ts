import { loggedUser } from "../mocks/users";
import type { Chat, ChatPreviewType, Message } from "../models/chat";

export async function getChatPreviews(): Promise<ChatPreviewType[]> {
  const response = await fetch("http://localhost:3000/chatPreviews");
  if (!response.ok) throw new Error("Could not fetch chat previews");

  const data: ChatPreviewType[] = await response.json();
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
