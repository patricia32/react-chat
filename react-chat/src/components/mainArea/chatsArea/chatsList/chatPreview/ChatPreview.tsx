import type { ChatPreviewType } from "../../../../../models/chat";
import { loggedUser, users } from "../../../../../mocks/users";
import "./ChatPreview.scss";
import { UserCard } from "../../../userCard/UserCard";

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
        <div className="chatPreview__details-name">{sender.name}</div>
        <div className="chatPreview__details-message">
          {chat.lastMessageContent}
        </div>
      </div>
    </div>
  );
};
