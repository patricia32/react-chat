import type { Message } from "../../../../models/chat";
import { MessageBox } from "./MessageBox";
import "./MessagesArea.scss";

interface MessagesAreaProps {
  messages: Message[];
}
export const MessagesArea = ({ messages }: MessagesAreaProps) => {
  return (
    <div className="messages">
      {messages.map((message) => (
        <MessageBox key={message.messageId} message={message} />
      ))}
    </div>
  );
};
