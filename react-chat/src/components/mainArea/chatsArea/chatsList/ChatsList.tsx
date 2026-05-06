import type { ChatPreviewType } from "../../../../models/chat";
import { EmptyState } from "../../emptyState/EmptyState";
import { ChatPreview } from "./chatPreview/ChatPreview";

import "./ChatsList.scss";

interface ChatsListProps {
  chats: ChatPreviewType[];
}
export const ChatsList = ({ chats }: ChatsListProps) => {
  return (
    <div className="chatsList">
      {chats.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="chatsList__wrapper">
          {chats.map((chat) => (
            <ChatPreview key={chat.chatId} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
};
