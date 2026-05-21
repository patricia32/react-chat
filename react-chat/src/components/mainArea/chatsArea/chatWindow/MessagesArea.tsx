import { useEffect, useRef } from "react";
import type { Message } from "../../../../models/chat";
import { MessageBox } from "./MessageBox";
import "./MessagesArea.scss";
import { formatMessageDate } from "../../../../utils/functions";
import React from "react";

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
      {messages.map((message, index) => {
        const currentDate = new Date(message.createdAt);

        const previousMessage = messages[index - 1];
        const previousDate = previousMessage
          ? new Date(previousMessage.createdAt)
          : null;

        const showDate =
          !previousDate ||
          previousDate.toDateString() !== currentDate.toDateString();
        return (
          <React.Fragment key={message.messageId}>
            <div className="messages-date">
              {showDate && formatMessageDate(message.createdAt)}
            </div>
            <MessageBox key={message.messageId} message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
