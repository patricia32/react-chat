import type { User } from "../../../../models/user";
import { UserCard } from "../../userCard/UserCard";

import "./ActiveFriends.scss";
import { openChatByUserId } from "../../../../utils/functions";

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
              <button
                key={user.user_id}
                className="activeFriends__wrapper-user"
                onClick={() => {
                  openChatByUserId(user.user_id);
                }}
              >
                <UserCard key={user.user_id} user={user} includeName={true} />
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
