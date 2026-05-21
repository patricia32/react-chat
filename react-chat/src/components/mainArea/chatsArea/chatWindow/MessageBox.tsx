import "./MessageBox.scss";

import type { Message } from "../../../../models/chat";
import { loggedUser } from "../../../../mocks/loggedUser";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MessageProps {
  message: Message;
}
export const MessageBox = ({ message }: MessageProps) => {
  const getMessageTime = () => {
    const createdAt = new Date(message.createdAt);
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`message ${message.senderId === loggedUser.id ? "right" : "left"}`}
    >
      {message.content}
      <div className="message__info">
        <div className="message__info-time">{getMessageTime()}</div>

        <div>
          {message.senderId === loggedUser.id && (
            <FontAwesomeIcon
              icon={faCheck}
              size="sm"
              style={{
                color: message.isRead
                  ? "var(--accent-purple)"
                  : "var(--offline)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
