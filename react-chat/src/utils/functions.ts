import { loggedUser, users } from "../mocks/users";
import type { User } from "../models/user";

export const getSecondUser = (userIds: string[]): User => {
  const otherUserId = userIds.find((id) => id !== loggedUser.id);
  const secondUser = users.find((user) => user.id === otherUserId);
  return secondUser as User;
};
