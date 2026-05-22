import { getChatIdByUserIds } from "../../../APIs/APIs";
import type { User } from "../../../models/user";
import { redirectToChat } from "../../../utils/functions";
import "./UserCard.scss";

interface UserCardProps {
  user: User;
  includeName?: boolean;
}
export const UserCard = ({ user, includeName = false }: UserCardProps) => {
  const openChat = () => {
    getChatIdByUserIds(user.id).then((data) => {
      redirectToChat(data);
    });
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
