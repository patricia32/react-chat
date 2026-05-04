import { ActiveFriends } from "./activeFriends/ActiveFriends";
import "./ChatsArea.scss";
import { SearchBar } from "./searchBar/SearchBar";

export const ChatsArea = () => {
  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends />
    </div>
  );
};
