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
import { getChatByID, getChatMessages } from "../../../../APIs/APIs";
import { MessagesArea } from "./MessagesArea";
import { InfoArea } from "../../infoArea/InfoArea";
import { useAppStore } from "../../../../store/appStore";

interface ChatWindowProps {
  chat_id: string;
}
export const ChatWindow = ({ chat_id }: ChatWindowProps) => {
  const setSelectedField = useAppStore((state) => state.setSelectedField);

  const [chat, setChat] = useState<Chat>();

  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState(true);
  const [chatError, setChatError] = useState<boolean>(false);
  const [secondUser, setSecondUser] = useState<User>();

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setChatError(false);

      Promise.all([getChatByID(chat_id), getChatMessages(chat_id)])
        .then(async ([chatData, messagesData]) => {
          if (chatData) setChat(chatData);
          if (messagesData) setMessages(messagesData);

          const secondUserData: User = await getSecondUser([
            chatData.user1_id,
            chatData.user2_id,
          ]);

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
  }, [chat_id]);

  const displayNewMessage = (newMessage: Message) => {
    setMessages((prev) => {
      if (!prev) return [];

      return [...prev, newMessage];
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
                src={`usersPhotos/${secondUser.user_id}.png`}
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
                <div className={secondUser.is_active ? "onlineBullet" : ""} />
                <span>{secondUser.is_active ? "Online" : "Offline"}</span>
              </div>
            </div>
            <div className="chatWindow__header__wrapper__actions">
              <Icon icon={faPhone} />
              <Icon icon={faVideo} />
              <Icon icon={faInfo} />
            </div>
          </div>
        </div>
        <MessagesArea messages={messages ? messages : []} />
        <div className="chatWindow__send">
          <SendMessage
            chatId={chat.chat_id}
            displayNewMessage={displayNewMessage}
          />
        </div>
      </div>
    );
};
