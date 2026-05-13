import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";
import { useEffect, useState } from "react";
import type { ChatPreviewType } from "../../../models/chat";
import type { User } from "../../../models/user";
import { getActiveUsers, getChatPreviews } from "../../../APIs/APIs";

interface ChatsAreaProps {
  setSelectedField: (value: string) => void;
}
export const ChatsArea = ({ setSelectedField }: ChatsAreaProps) => {
  const [activeFriends, setActiveFriends] = useState<User[]>([]);
  const [chats, setChats] = useState<ChatPreviewType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      Promise.all([getChatPreviews(), getActiveUsers()])
        .then(([chatPreviewsData, activeUsersData]) => {
          setChats(chatPreviewsData);
          setActiveFriends(activeUsersData);
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
      <ActiveFriends users={activeFriends} />
      <ChatsList chats={chats} setSelectedField={setSelectedField} />
    </div>
  );
};
