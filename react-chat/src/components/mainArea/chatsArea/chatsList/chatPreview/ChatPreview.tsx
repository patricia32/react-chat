import "./ChatPreview.scss";
import type { ChatPreviewType } from "../../../../../models/chat";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";
import { getSecondUser, redirectToChat } from "../../../../../utils/functions";
import { useEffect, useState } from "react";
import type { User } from "../../../../../models/user";

interface ChatPreviewProps {
  chat: ChatPreviewType;
}
export const ChatPreview = ({ chat }: ChatPreviewProps) => {
  const [secondUser, setSecondUser] = useState<User>({
    id: "",
    name: "",
    active: false,
  });
  const [secondUserError, setSecondUserError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setSecondUserError("");

        const data = await getSecondUser(chat.userIds);
        if (!data) return;
        setSecondUser(data);
      } catch (err) {
        setSecondUserError(err + "");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chat.userIds, chat.chatId]);

  const displayMessagePreview = () => {
    return (
      <button
        className="chatPreview"
        onClick={() => {
          redirectToChat(chat.chatId);
        }}
      >
        <UserCard user={secondUser} />
        <div className="chatPreview__details">
          <div className={`chatPreview__details__left `}>
            <div
              className={`chatPreview__details__left-name ${!chat.openedChat ? "highlight-name" : ""}`}
            >
              {secondUser.name}
            </div>
            <div
              className={`chatPreview__details__left-message ${!chat.openedChat ? "highlight-message" : ""}`}
            >
              {chat.lastMessageContent}
            </div>
          </div>
          {chat.lastMessageIsRead && <UserSeenBullet userId={secondUser.id} />}
        </div>
      </button>
    );
  };

  const displayMessageError = () => {
    return (
      <button className="chatPreview">
        <UserCard user={secondUser} />
        <div className="chatPreview__details">
          <div className={`chatPreview__details__left `}>
            <div className={`chatPreview__details__left-name `}>
              User unavailable
            </div>
            <div className={`chatPreview__details__left-message`}>
              Content unavailable
            </div>
          </div>
        </div>
      </button>
    );
  };

  const displayMessageLoading = () => {
    return (
      <button className="chatPreview">
        <UserCard user={secondUser} />
        <div className="chatPreview__details">
          <div className={`chatPreview__details__left `}>
            <div className={`chatPreview__details__left-name loading `}></div>
            <div className={`chatPreview__details__left-message loading`}></div>
          </div>
        </div>
      </button>
    );
  };

  if (loading) return displayMessageLoading();
  if (secondUserError) return displayMessageError();
  if (secondUser) return displayMessagePreview();
};
