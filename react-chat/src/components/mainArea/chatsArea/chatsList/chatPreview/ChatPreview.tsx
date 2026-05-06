import type { ChatPreviewType } from "../../../../../models/chat";
import { loggedUser, users } from "../../../../../mocks/users";
import "./ChatPreview.scss";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";

interface ChatPreviewProps {
  chat: ChatPreviewType;
}
export const ChatPreview = ({ chat }: ChatPreviewProps) => {
  const otherUserId = chat.userIds.find((id) => id !== loggedUser.id);

  const sender = users.find((user) => user.id === otherUserId);

  if (!sender) return null;

  return (
    <div className="chatPreview">
      <UserCard user={sender} />
      <div className="chatPreview__details">
        <div className="chatPreview__details__left">
          <div className="chatPreview__details__left-name">{sender.name}</div>
          <div className="chatPreview__details__left-message">
            {chat.lastMessageContent}
          </div>
        </div>
        {chat.lastMessageIsRead && <UserSeenBullet userId={sender.id} />}
      </div>
    </div>
  );
};
