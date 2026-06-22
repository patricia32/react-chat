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
    const createdAt = new Date(message.created_at);
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`message ${message.content.length < 8 ? "short" : "long"}  ${message.sender_id === loggedUser.user_id ? "right" : "left"}`}
    >
      {message.content}
      <div className="message__info">
        <div className="message__info-time">{getMessageTime()}</div>

        <div>
          {message.sender_id === loggedUser.user_id && (
            <FontAwesomeIcon
              icon={faCheck}
              size="sm"
              style={{
                color: message.is_read ? "var(--online)" : "var(--offline)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
