import type { User } from "../../../../models/user";
import { UserCard } from "../../userCard/UserCard";
import "./ActiveFriends.scss";

interface ActiveFriendsProps {
  users: User[];
}
export const ActiveFriends = ({ users }: ActiveFriendsProps) => {
  return (
    <div className="activeFriends">
      {users.length !== 0 && (
        <div className="activeFriends__wrapper">
          {users
            .filter((user) => user.is_active)
            .map((user) => (
              <UserCard key={user.user_id} user={user} includeName={true} />
            ))}
        </div>
      )}
    </div>
  );
};
