import { useEffect, useState } from "react";
import { chats } from "../../../../mocks/chats";
import type { Chat } from "../../../../models/chat";
import { getSecondUser } from "../../../../utils/functions";
import type { User } from "../../../../models/user";

interface ChatWindowProps {
  chatId: string;
}
export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const [chat, setChat] = useState<Chat>();
  const [secondUser, setSecondUser] = useState<User>();

  useEffect(() => {
    const func = () => {
      const foundChat = chats.find((chat) => chat.chatId === chatId);
      if (foundChat) {
        setChat(foundChat);
        setSecondUser(getSecondUser(foundChat.userIds));
      } else return;
    };
    func();
  }, [chatId]);

  if (!chat || !secondUser) return;

  return <div>chat {chatId}</div>;
};
