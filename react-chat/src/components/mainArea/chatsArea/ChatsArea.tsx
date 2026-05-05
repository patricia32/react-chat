import { chats } from "../../../mocks/chats";
import { users } from "../../../mocks/users";

import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";

export const ChatsArea = () => {
  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends users={users} />
      <ChatsList chats={chats} />
    </div>
  );
};
