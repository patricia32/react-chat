import { ActiveFriendContainer } from "./activeFriendContainer/ActiveFriendContainer";
import "./ActiveFriends.scss";

export const ActiveFriends = () => {
  return (
    <div className="activeFriends">
      <ActiveFriendContainer name="Josh" imagePath="usersPhotos/primary.png" />
      <ActiveFriendContainer name="Mary" imagePath="" />
    </div>
  );
};
