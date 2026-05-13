import { getUserByIdAPI } from "../APIs/APIs";
import { loggedUser } from "../mocks/loggedUser";
import type { User } from "../models/user";

export const getSecondUser = async (
  userIds: string[],
): Promise<User | null> => {
  const otherUserId = userIds.find((id) => id !== loggedUser.id);

  if (!otherUserId) return null;

  try {
    const data = await getUserByIdAPI(otherUserId);
    return data as User;
  } catch (err) {
    console.log(err);
    return null;
  }
};
