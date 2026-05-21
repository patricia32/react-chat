import { getUserByIdAPI } from "../APIs/APIs";
import { loggedUser } from "../mocks/loggedUser";
import type { User } from "../models/user";

export const getSecondUser = async (
  userIds: string[],
): Promise<User | null> => {
  const otherUserId = userIds.find((id) => id !== loggedUser.id);

  if (!otherUserId) return null;

  try {
    return await getUserByIdAPI(otherUserId);
  } catch (err) {
    throw new Error(`Could not fetch user`, {
      cause: err,
    });
  }
};

export const formatMessageDate = (dateProp: Date) => {
  const date = new Date(dateProp);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return "Yesterday";

  const diffTime = today.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 7)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
};
