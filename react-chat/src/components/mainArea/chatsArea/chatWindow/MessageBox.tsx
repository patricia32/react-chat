import "./MessageBox.scss";

import type { Message } from "../../../../models/chat";
import { loggedUser } from "../../../../mocks/users";

interface MessageProps {
  message: Message;
}
export const MessageBox = ({ message }: MessageProps) => {
  return (
    <div
      className={`message ${message.senderId === loggedUser.id ? "right" : "left"}`}
    >
      {message.content}
    </div>
  );
};
