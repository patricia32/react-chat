import type { ChatPreviewType } from "../../../../models/chat";
import { InfoArea } from "../../infoArea/InfoArea";
import { ChatPreview } from "./chatPreview/ChatPreview";

import "./ChatsList.scss";

interface ChatsListProps {
  chats: ChatPreviewType[];
  setSelectedField: (value: string) => void;
}
export const ChatsList = ({ chats, setSelectedField }: ChatsListProps) => {
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
          {chats.map((chat) => (
            <ChatPreview
              key={chat.chatId}
              chat={chat}
              setSelectedField={setSelectedField}
            />
          ))}
        </div>
      )}
    </div>
  );
};
