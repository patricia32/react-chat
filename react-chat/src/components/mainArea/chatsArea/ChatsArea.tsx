import { chats } from "../../../mocks/chats";
import { users } from "../../../mocks/users";

import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";

interface ChatsAreaProps {
  setSelectedField: (value: string) => void;
}
export const ChatsArea = ({ setSelectedField }: ChatsAreaProps) => {
  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends users={users} />
      <ChatsList chats={chats} setSelectedField={setSelectedField} />
    </div>
  );
};
