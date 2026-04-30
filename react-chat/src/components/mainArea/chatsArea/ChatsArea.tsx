import { ActiveFriends } from "./activeFriends/ActiveFriends";
import "./ChatsArea.scss";

export const ChatsArea = () => {
  return (
    <div className="chatsArea">
      <ActiveFriends />
    </div>
  );
};
