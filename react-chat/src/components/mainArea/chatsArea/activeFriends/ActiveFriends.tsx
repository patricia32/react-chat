import type { User } from "../../../../models/user";
import { ActiveFriendContainer } from "./activeFriendContainer/ActiveFriendContainer";
import "./ActiveFriends.scss";

interface ActiveFriendsProps {
  users: Pick<User, "id" | "name">[];
}
export const ActiveFriends = ({ users }: ActiveFriendsProps) => {
  return (
    <div className="activeFriends">
      {users.length !== 0 && (
        <div className="activeFriends__wrapper">
          {users.map(({ id, name }) => (
            <ActiveFriendContainer id={id} name={name} includeName={true} />
          ))}
        </div>
      )}
    </div>
  );
};
