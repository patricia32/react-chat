import { ActiveFriendContainer } from "./activeFriendContainer/ActiveFriendContainer";
import "./ActiveFriends.scss";

export const ActiveFriends = () => {
  return (
    <div className="activeFriends">
      <ActiveFriendContainer />
      <ActiveFriendContainer />
    </div>
  );
};
