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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSend = (textareaInput: string) => {
    if (textareaInput.trim().length === 0) {
      setError("Please write something");
      return;
    }

    setLoading(true);
    setError("");
    sendMessageAPI(textareaInput, chatId)
      .then((data) => {
        displayNewMessage(data);
        setTextareaInput("");
      })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="sendMessage">
      <div className="sendMessage__wrapper">
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
          disabled={loading}
          onClick={() => {
            onSend(textareaInput);
          }}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
      <div className="sendMessage-feedback">{error ? error : ""}</div>
    </div>
  );
};
