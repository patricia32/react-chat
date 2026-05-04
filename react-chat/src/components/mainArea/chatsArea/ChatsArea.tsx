import { users } from "../../../mocks/users";
import { ActiveFriends } from "./activeFriends/ActiveFriends";
import "./ChatsArea.scss";
import { SearchBar } from "./searchBar/SearchBar";

export const ChatsArea = () => {
  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends users={users} />
    </div>
  );
};
