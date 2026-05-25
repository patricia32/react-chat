import { createNewChat, getChatIdByUserIds } from "../../../APIs/APIs";
import { loggedUser } from "../../../mocks/loggedUser";
import type { User } from "../../../models/user";
import { redirectToChat } from "../../../utils/functions";
import "./UserCard.scss";

interface UserCardProps {
  user: User;
  includeName?: boolean;
}
export const UserCard = ({ user, includeName = false }: UserCardProps) => {
  const openChat = async () => {
    try {
      const chatId = await getChatIdByUserIds(user.id);
      if (chatId) redirectToChat(chatId);
      else
        try {
          const newChatId = await createNewChat([loggedUser.id, user.id]);
          redirectToChat(newChatId);
        } catch (createError) {
          console.log(createError);
        }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="userCard"
      onClick={() => {
        openChat();
      }}
    >
      <div className="userCard__container">
        <img
          className="userCard__container-image"
          src={`usersPhotos/${user.id}.png`}
          onError={(e) => {
            e.currentTarget.src = "/usersPhotos/default.png";
          }}
          alt="Name photo"
        />
      </div>
      <span
        className={`userCard__status ${user.active ? "active" : "offline"}`}
      ></span>
      {includeName && <div className="userCard-name">{user.name}</div>}
    </button>
  );
};
