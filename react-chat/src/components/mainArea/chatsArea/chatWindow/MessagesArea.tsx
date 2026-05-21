import { useEffect, useRef } from "react";
import type { Message } from "../../../../models/chat";
import { MessageBox } from "./MessageBox";
import "./MessagesArea.scss";

interface MessagesAreaProps {
  messages: Message[];
}
export const MessagesArea = ({ messages }: MessagesAreaProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="messages" ref={messagesRef}>
      {messages.map((message) => (
        <MessageBox key={message.messageId} message={message} />
      ))}
    </div>
  );
};
