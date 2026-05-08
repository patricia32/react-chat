import { useRef } from "react";
import "./SendMessage.scss";

export const SendMessage = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="sendMessage">
      <textarea
        placeholder="Send a message..."
        rows={1}
        ref={textareaRef}
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = Math.min(el.scrollHeight, 200) + "px";
        }}
      />
      <button>Send</button>
    </div>
  );
};
