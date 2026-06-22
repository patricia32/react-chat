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
        const currentDate = new Date(message.created_at);

        const previousMessage = messages[index - 1];
        const previousDate = previousMessage
          ? new Date(previousMessage.created_at)
          : null;

        const showDate =
          !previousDate ||
          previousDate.toDateString() !== currentDate.toDateString();
        return (
          <React.Fragment key={message.message_id}>
            <div className="messages-date">
              {showDate && formatMessageDate(message.created_at)}
            </div>
            <MessageBox key={message.message_id} message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
