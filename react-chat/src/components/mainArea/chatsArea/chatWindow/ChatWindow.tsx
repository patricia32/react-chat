import "./ChatWindow.scss";

import { useEffect, useState } from "react";
import { chats } from "../../../../mocks/chats";
import { getSecondUser } from "../../../../utils/functions";

import type { Chat } from "../../../../models/chat";
import type { User } from "../../../../models/user";
import {
  faArrowLeft,
  faPhone,
  faVideo,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../../../../utils/Icon";
import { MessageBox } from "./MessageBox";
import { SendMessage } from "../../../sendMessage/SendMessage";
interface ChatWindowProps {
  chatId: string;
  setSelectedField: (value: string) => void;
}
export const ChatWindow = ({ chatId, setSelectedField }: ChatWindowProps) => {
  const [chat, setChat] = useState<Chat>();
  const [secondUser, setSecondUser] = useState<User>();

  useEffect(() => {
    const func = () => {
      const foundChat = chats.find((chat) => chat.chatId === chatId);
      if (foundChat) {
        setChat(foundChat);
        setSecondUser(getSecondUser(foundChat.userIds));
      } else return;
    };
    func();
  }, [chatId]);

  if (!chat || !secondUser) return;

  const goBack = () => {
    setSelectedField("Chats");
  };

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
      <div className="chatWindow__messages">
        {chat.messages.map((message) => (
          <MessageBox key={message.messageId} message={message} />
        ))}
      </div>
      <div className="chatWindow__send">
        <SendMessage />
      </div>
    </div>
  );
};
