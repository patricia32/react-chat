import "./ChatPreview.scss";
import type { ChatPreviewType } from "../../../../../models/chat";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";
import { getSecondUser } from "../../../../../utils/functions";
import { useEffect, useState } from "react";
import type { User } from "../../../../../models/user";

interface ChatPreviewProps {
  chat: ChatPreviewType;
  setSelectedField: (value: string) => void;
}
export const ChatPreview = ({ chat, setSelectedField }: ChatPreviewProps) => {
  const [secondUser, setSecondUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getSecondUser(chat.userIds);
        if (!data) return;
        setSecondUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chat.userIds, chat.chatId]);

  const redirectToChat = (chatId: string) => {
    if (!chatId) return;
    setSelectedField(`chat/:${chatId}`);
  };

  if (loading) return <div>Loading</div>;
  if (secondUser)
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
