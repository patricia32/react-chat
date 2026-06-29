import type { User } from "../../../models/user";
import "./UserCard.scss";

interface UserCardProps {
  user: User;
  includeName?: boolean;
  size?: "sm" | "md";
}
export const UserCard = ({
  user,
  includeName = false,
  size = "md",
}: UserCardProps) => {
  return (
    <div className="userCard">
      <div className={`userCard__container ${size}`}>
        <img
          className="userCard__container-image"
          src={`usersPhotos/${user.user_id}.png`}
          onError={(e) => {
            e.currentTarget.src = "/usersPhotos/default.png";
          }}
          alt="Name photo"
        />
      </div>
      <span
        className={`userCard__status ${user.is_active ? "active" : "offline"}`}
      ></span>
      {includeName && <div className="userCard-name">{user.name}</div>}
    </div>
  );
};
