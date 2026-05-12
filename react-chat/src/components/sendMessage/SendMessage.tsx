import { useRef, useState } from "react";
import "./SendMessage.scss";

interface SendMessageProps {
  onSend: (value: string) => void;
}
export const SendMessage = ({ onSend }: SendMessageProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaInput, setTextareaInput] = useState("");

  return (
    <div className="sendMessage">
      <textarea
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
