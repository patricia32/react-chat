import type { ChatPreviewType } from "../../../../../models/chat";
import { loggedUser, users } from "../../../../../mocks/users";
import "./ChatPreview.scss";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";

interface ChatPreviewProps {
  chat: ChatPreviewType;
  setSelectedField: (value: string) => void;
}
export const ChatPreview = ({ chat, setSelectedField }: ChatPreviewProps) => {
  const otherUserId = chat.userIds.find((id) => id !== loggedUser.id);

  const sender = users.find((user) => user.id === otherUserId);

  if (!sender) return null;

  const redirectToChat = (userId: string) => {
    if (!userId) return;
    setSelectedField(`chat/:{${userId}}`);
  };

  return (
    <button
      className="chatPreview"
      onClick={() => {
        redirectToChat(sender.id);
      }}
    >
      <UserCard user={sender} />
      <div className="chatPreview__details">
        <div className={`chatPreview__details__left `}>
          <div
            className={`chatPreview__details__left-name ${!chat.openedChat && "highlight-name"}`}
          >
            {sender.name}
          </div>
          <div
            className={`chatPreview__details__left-message ${!chat.openedChat && "highlight-message"}`}
          >
            {chat.lastMessageContent}
          </div>
        </div>
        {chat.lastMessageIsRead && <UserSeenBullet userId={sender.id} />}
      </div>
    </button>
  );
};
