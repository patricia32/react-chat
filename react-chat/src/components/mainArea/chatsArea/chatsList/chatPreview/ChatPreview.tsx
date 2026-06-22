import "./ChatPreview.scss";
import type { ChatPreviewType } from "../../../../../models/chat";
import { UserCard } from "../../../userCard/UserCard";
import { UserSeenBullet } from "../../../userSeenBullet/UserSeenBullet";
import {
  formatChatPreviewDate,
  redirectToChat,
} from "../../../../../utils/functions";
import { useEffect, useState } from "react";
import type { User } from "../../../../../models/user";
import { loggedUser } from "../../../../../mocks/loggedUser";
import { getUserByIdAPI } from "../../../../../APIs/APIs";

interface ChatPreviewProps {
  chat: ChatPreviewType;
}
export const ChatPreview = ({ chat }: ChatPreviewProps) => {
  console.log(chat);
  const [secondUser, setSecondUser] = useState<User>({
    user_id: "",
    name: "",
    is_active: false,
  });
  const [secondUserError, setSecondUserError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setSecondUserError("");

        let data;
        if (loggedUser.user_id === chat.user1_id)
          data = await getUserByIdAPI(chat.user2_id);
        else data = await getUserByIdAPI(chat.user1_id);

        if (!data) return;
        setSecondUser(data);
      } catch (err) {
        setSecondUserError(err + "");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chat.chat_id, chat.user1_id, chat.user2_id]);

  const displayMessagePreview = () => {
    return (
      <div className="chatPreview ">
        <UserCard user={secondUser} />
        <button
          className="chatPreview__details clickable"
          onClick={() => {
            redirectToChat(chat.chat_id, secondUser.user_id);
          }}
        >
          <div className={`chatPreview__details__left `}>
            <div
              className={`chatPreview__details__left-name ${!chat.is_open ? "highlight-name" : ""}`}
            >
              {secondUser.name}
            </div>
            <div
              className={`chatPreview__details__left-message ${!chat.is_open ? "highlight-message" : ""}`}
            >
              {chat.last_message_content}
            </div>
          </div>
          <div className="chatPreview__details__right">
            <div>{formatChatPreviewDate(chat.last_message_at)}</div>
            {chat.last_message_is_read && (
              <UserSeenBullet userId={secondUser.user_id} />
            )}
          </div>
        </button>
      </div>
    );
  };

  const displayMessageError = () => {
    return (
      <div className="chatPreview">
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
      </div>
    );
  };

  const displayMessageLoading = () => {
    return (
      <div className="chatPreview">
        <UserCard user={secondUser} />
        <div className="chatPreview__details">
          <div className={`chatPreview__details__left `}>
            <div className={`chatPreview__details__left-name loading `}></div>
            <div className={`chatPreview__details__left-message loading`}></div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return displayMessageLoading();
  if (secondUserError) return displayMessageError();
  if (secondUser) return displayMessagePreview();
};
