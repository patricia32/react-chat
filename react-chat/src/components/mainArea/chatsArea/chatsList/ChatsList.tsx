import type { ChatPreviewType } from "../../../../models/chat";
import { InfoArea } from "../../infoArea/InfoArea";
import { ChatPreview } from "./chatPreview/ChatPreview";

import "./ChatsList.scss";

interface ChatsListProps {
  chats: ChatPreviewType[];
}
export const ChatsList = ({ chats }: ChatsListProps) => {
  return (
    <div className="chatsList">
      {chats.length === 0 ? (
        <InfoArea
          imagePath="areaIcon.png"
          title="Welcome to your messages!"
          content=" Select a chat or start a new conversation to see your messages here"
        />
      ) : (
        <div className="chatsList__wrapper">
          {chats
            .sort((a, b) => (a.last_message_at < b.last_message_at ? 1 : -1))
            .map(
              (chat) =>
                chat.last_message_content && (
                  <ChatPreview key={chat.chat_id} chat={chat} />
                ),
            )}
        </div>
      )}
    </div>
  );
};
