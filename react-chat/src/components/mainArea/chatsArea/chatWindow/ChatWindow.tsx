import "./ChatWindow.scss";

import { useEffect, useState } from "react";
import { chats } from "../../../../mocks/chats";
import { getSecondUser } from "../../../../utils/functions";

import type { Chat } from "../../../../models/chat";
import type { User } from "../../../../models/user";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../utils/icon";
interface ChatWindowProps {
  chatId: string;
}
export const ChatWindow = ({ chatId }: ChatWindowProps) => {
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

  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <button className="chatWindow__header__back">
          <Icon icon={faArrowLeft} />
          {/* <FontAwesomeIcon
            icon={faArrowLeft}
            // className="chatWindow__header__back-icon"
          /> */}
          {/* <ArrowBackIcon/> */}
        </button>
        <div className="chatWindow__header__wrapper">
          <div className="chatWindow__header__wrapper__image">
            <img
              src={`usersPhotos/${secondUser.id}.png`}
              alt={`${secondUser.name} photo`}
            />
          </div>
          <div className="chatWindow__header__wrapper__user">name</div>
          <div className="chatWindow__header__wrapper__actions">call</div>
        </div>
      </div>
    </div>
  );
};
