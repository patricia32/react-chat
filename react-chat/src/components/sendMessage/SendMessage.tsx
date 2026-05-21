import { useRef, useState } from "react";
import { sendMessageAPI } from "../../APIs/APIs";
import "./SendMessage.scss";
import type { Message } from "../../models/chat";

interface SendMessageProps {
  chatId: string;
  displayNewMessage: (value: Message) => void;
}
export const SendMessage = ({
  chatId,
  displayNewMessage,
}: SendMessageProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaInput, setTextareaInput] = useState("");

  const onSend = (textareaInput: string) => {
    sendMessageAPI(textareaInput, chatId).then((data) => {
      displayNewMessage(data);
      setTextareaInput("");
    });
  };

  return (
    <div className="sendMessage">
      <textarea
        value={textareaInput}
        onChange={(e) => {
          setTextareaInput(e.target.value);
        }}
        placeholder="Send a message..."
        rows={1}
        ref={textareaRef}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 200) + "px";
        }}
      />
      <button
        onClick={() => {
          onSend(textareaInput);
        }}
      >
        Send
      </button>
    </div>
  );
};
