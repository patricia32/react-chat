import type { User } from "../../../../models/user";
import { UserCard } from "../../userCard/UserCard";

import "./ActiveFriends.scss";
import { redirectToChat } from "../../../../utils/functions";
import { loggedUser } from "../../../../mocks/loggedUser";
import { getChatIdByUserIds, createNewChat } from "../../../../APIs/APIs";

interface ActiveFriendsProps {
  users: User[];
}
export const ActiveFriends = ({ users }: ActiveFriendsProps) => {
  const openChat = async (user: User) => {
    const chatId = await getChatIdByUserIds(user.user_id);

    if (chatId) {
      redirectToChat(chatId, user.user_id);
    } else {
      const newChatId = await createNewChat([loggedUser.user_id, user.user_id]);
      redirectToChat(newChatId, user.user_id);
    }
  };
  return (
    <div className="activeFriends">
      {users.length !== 0 && (
        <div className="activeFriends__wrapper">
          {users
            .filter((user) => user.is_active)
            .map((user) => (
              <button
                key={user.user_id}
                className="activeFriends__wrapper-user"
                onClick={() => {
                  openChat(user);
                }}
              >
                <UserCard key={user.user_id} user={user} includeName={true} />
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
