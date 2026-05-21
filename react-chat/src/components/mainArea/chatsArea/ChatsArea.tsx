import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";
import { useEffect, useState } from "react";
import type { ChatPreviewType } from "../../../models/chat";
import type { User } from "../../../models/user";
import { getActiveUsers, getChatPreviews } from "../../../APIs/APIs";
import { InfoArea } from "../infoArea/InfoArea";

interface ChatsAreaProps {
  setSelectedField: (value: string) => void;
}
export const ChatsArea = ({ setSelectedField }: ChatsAreaProps) => {
  const [activeFriends, setActiveFriends] = useState<User[]>([]);
  const [chats, setChats] = useState<ChatPreviewType[]>([]);

  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);

      Promise.all([getChatPreviews(), getActiveUsers()])
        .then(([chatPreviewsData, activeUsersData]) => {
          setChats(chatPreviewsData);
          setActiveFriends(activeUsersData);
        })
        .catch(() => {
          setFetchError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <InfoArea
        imagePath="loadingIcon.png"
        title="Loading..."
        content="Please wait"
      />
    );

  if (fetchError)
    return (
      <InfoArea
        imagePath="errorIcon.png"
        title="Oops!"
        content="Something went wrong. Please try again later"
      />
    );

  return (
    <div className="chatsArea">
      <SearchBar />
      <ActiveFriends users={activeFriends} />
      <ChatsList chats={chats} setSelectedField={setSelectedField} />
    </div>
  );
};
