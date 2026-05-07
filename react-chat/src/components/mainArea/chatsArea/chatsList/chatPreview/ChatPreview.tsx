import "./ChatPreview.scss";
import type { ChatPreviewType } from "../../../../../models/chat";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";
import { getSecondUser } from "../../../../../utils/functions";

interface ChatPreviewProps {
  chat: ChatPreviewType;
  setSelectedField: (value: string) => void;
}
export const ChatPreview = ({ chat, setSelectedField }: ChatPreviewProps) => {
  const secondUser = getSecondUser(chat.userIds);

  if (!secondUser) return null;

  const redirectToChat = (chatId: string) => {
    if (!chatId) return;
    setSelectedField(`chat/:${chatId}`);
  };

  return (
    <button
      className="chatPreview"
      onClick={() => {
        redirectToChat(chat.chatId);
      }}
    >
      <UserCard user={secondUser} />
      <div className="chatPreview__details">
        <div className={`chatPreview__details__left `}>
          <div
            className={`chatPreview__details__left-name ${!chat.openedChat && "highlight-name"}`}
          >
            {secondUser.name}
          </div>
          <div
            className={`chatPreview__details__left-message ${!chat.openedChat && "highlight-message"}`}
          >
            {chat.lastMessageContent}
          </div>
        </div>
        {chat.lastMessageIsRead && <UserSeenBullet userId={secondUser.id} />}
      </div>
    </button>
  );
};
