import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";
import { useEffect, useState } from "react";
import type { ChatPreviewType } from "../../../models/chat";
import { getChatPreviews } from "../../../APIs/apis";
import { users } from "../../../mocks/users";

interface ChatsAreaProps {
  setSelectedField: (value: string) => void;
}
export const ChatsArea = ({ setSelectedField }: ChatsAreaProps) => {
  const [chats, setChats] = useState<ChatPreviewType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setChats([]);
      getChatPreviews()
        .then((data: ChatPreviewType[]) => {
          setChats(data);
        })
        .catch((err: string) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends users={users} />
      <ChatsList chats={chats} setSelectedField={setSelectedField} />
    </div>
  );
};
