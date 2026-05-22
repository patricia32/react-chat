import "./ChatWindow.scss";

import { useEffect, useState } from "react";
import { getSecondUser } from "../../../../utils/functions";

import type { Chat, Message } from "../../../../models/chat";
import type { User } from "../../../../models/user";
import {
  faArrowLeft,
  faPhone,
  faVideo,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../../../../utils/Icon";
import { SendMessage } from "../../../sendMessage/SendMessage";
import { getChatByID } from "../../../../APIs/APIs";
import { MessagesArea } from "./MessagesArea";
import { InfoArea } from "../../infoArea/InfoArea";
import { useAppStore } from "../../../../store/appStore";

interface ChatWindowProps {
  chatId: string;
}
export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const setSelectedField = useAppStore((state) => state.setSelectedField);

  const [chat, setChat] = useState<Chat>();
  const [loading, setLoading] = useState(true);
  const [chatError, setChatError] = useState<boolean>(false);
  const [secondUser, setSecondUser] = useState<User>();

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setChatError(false);

      getChatByID(chatId)
        .then(async (data) => {
          setChat(data);

          const secondUserData = await getSecondUser(data.userIds);
          if (secondUserData) setSecondUser(secondUserData);
        })
        .catch(() => {
          setChatError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchChat();
  }, [chatId]);

  const displayNewMessage = (newMessage: Message) => {
    if (chat)
      setChat((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
      });
  };
  const goBack = () => {
    setSelectedField("Chats");
  };

  if (loading)
    return (
      <InfoArea
        imagePath="loadingIcon.png"
        title="Loading..."
        content="Please wait"
      />
    );

  if (chatError)
    return (
      <InfoArea
        imagePath="errorIcon.png"
        title="Oops!"
        content="Something went wrong. Please try again later"
      />
    );

  if (chat && secondUser)
    return (
      <div className="chatWindow">
        <div className="chatWindow__header">
          <Icon
            icon={faArrowLeft}
            onClick={() => {
              goBack();
            }}
          />
          <div className="chatWindow__header__wrapper">
            <div className="chatWindow__header__wrapper__image">
              <img
                src={`usersPhotos/${secondUser.id}.png`}
                onError={(e) => {
                  e.currentTarget.src = "/usersPhotos/default.png";
                }}
                alt={`${secondUser.name} photo`}
              />
            </div>
            <div className="chatWindow__header__wrapper__user">
              <div className="chatWindow__header__wrapper__user-name">
                {secondUser.name}
              </div>
              <div className="chatWindow__header__wrapper__user__status">
                <div className={secondUser.active ? "onlineBullet" : ""} />
                <span>{secondUser.active ? "Online" : "Offline"}</span>
              </div>
            </div>
            <div className="chatWindow__header__wrapper__actions">
              <Icon icon={faPhone} />
              <Icon icon={faVideo} />
              <Icon icon={faInfo} />
            </div>
          </div>
        </div>
        <MessagesArea messages={chat.messages} />
        <div className="chatWindow__send">
          <SendMessage
            chatId={chat.chatId}
            displayNewMessage={displayNewMessage}
          />
        </div>
      </div>
    );
};
