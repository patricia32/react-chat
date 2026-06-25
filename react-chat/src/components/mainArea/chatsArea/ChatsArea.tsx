import "./ChatsArea.scss";
import { ChatsList } from "./chatsList/ChatsList";
import { SearchBar } from "./searchBar/SearchBar";
import { ActiveFriends } from "./activeFriends/ActiveFriends";
import { useEffect, useState } from "react";
import type { ChatPreviewType } from "../../../models/chat";
import type { User } from "../../../models/user";
import {
  getActiveUsers,
  getChatPreviews,
  searchUsersAPI,
} from "../../../APIs/APIs";
import { InfoArea } from "../infoArea/InfoArea";

export const ChatsArea = () => {
  const [activeFriends, setActiveFriends] = useState<User[]>([]);
  const [chats, setChats] = useState<ChatPreviewType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [usersSearch, setUsersSearch] = useState<User[]>([]);

  const [errors, setErrors] = useState({
    fetch: false,
    search: false,
  });

  const [loading, setLoading] = useState({
    fetch: true,
    search: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading((prev) => ({
        ...prev,
        fetch: true,
      }));
      setErrors((prev) => ({
        ...prev,
        fetch: false,
      }));

      Promise.all([getChatPreviews(), getActiveUsers()])
        .then(([chatPreviewsData, activeUsersData]) => {
          setChats(chatPreviewsData);
          setActiveFriends(activeUsersData);
        })
        .catch(() => {
          setErrors((prev) => ({
            ...prev,
            fetch: true,
          }));
        })
        .finally(() => {
          setLoading((prev) => ({
            ...prev,
            fetch: false,
          }));
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchInput.trim().length > 0) {
        setLoading((prev) => ({
          ...prev,
          search: true,
        }));
        setErrors((prev) => ({
          ...prev,
          search: false,
        }));
        searchUsersAPI(searchInput)
          .then((data) => {
            setUsersSearch(data);
          })
          .catch(() => {
            setErrors((prev) => ({
              ...prev,
              search: true,
            }));
          })
          .finally(() => {
            setLoading((prev) => ({
              ...prev,
              search: false,
            }));
          });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  if (loading.fetch)
    return (
      <InfoArea
        imagePath="loadingIcon.png"
        title="Loading..."
        content="Please wait"
      />
    );

  if (errors.fetch)
    return (
      <InfoArea
        imagePath="errorIcon.png"
        title="Oops!"
        content="Something went wrong. Please try again later"
      />
    );

  return (
    <div className="chatsArea">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        usersSearch={usersSearch}
        searchLoading={loading.search}
        searchError={errors.search}
      />
      <ActiveFriends users={activeFriends} />
      <ChatsList chats={chats} />
    </div>
  );
};
