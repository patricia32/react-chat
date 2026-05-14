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
