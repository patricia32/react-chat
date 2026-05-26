const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const CHAT_FILE = path.join(
  __dirname,
  "..",
  "react-chat",
  "src",
  "mocks",
  "chats.json",
);
const USER_FILE = path.join(
  __dirname,
  "..",
  "react-chat",
  "src",
  "mocks",
  "users.json",
);

const PORT = 3000;

const app = express();
app.use(express.json());

const allowOrigin = "*";
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

async function readChatData() {
  const raw = await fs.readFile(CHAT_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeChatData(data) {
  await fs.writeFile(CHAT_FILE, JSON.stringify(data, null, 2));
}

async function readUsersData() {
  const raw = await fs.readFile(USER_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeUsersData(data) {
  await fs.writeFile(USER_FILE, JSON.stringify(data, null, 2));
}

function validateMessageInput(senderId, text) {
  return {
    normalizedSenderId: String(senderId || "").trim(),
    normalizedText: String(text || "").trim(),
  };
}

app.get("/getUserById/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await readUsersData();
    const userById = users.filter((user) => user.id === userId);
    res.status(200).json(userById[0]);
  } catch (error) {
    console.error(`Failed to fetch user with id ${userId}`, error);

    res.status(500).json({
      error: `Failed to fetch user with id ${userId}.`,
    });
  }
});

app.get("/getActiveUsers", async (req, res) => {
  try {
    const users = await readUsersData();
    const activeUsers = users.filter((user) => user.active);
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error("Failed to fetch users", error);

    res.status(500).json({
      error: "Unable to fetch users.",
    });
  }
});

app.get("/chat/:loggedUserId/:secondUserId", async (req, res) => {
  try {
    const { loggedUserId, secondUserId } = req.params;
    const chats = await readChatData();

    const chatByUserIds = chats.find(
      (chat) =>
        chat.userIds.length === 2 &&
        chat.userIds.includes(loggedUserId) &&
        chat.userIds.includes(secondUserId),
    );
    res.status(200).json(chatByUserIds.chatId);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chat id" });
  }
});

app.get("/chat/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const chats = await readChatData();
    const chatById = chats.find((chat) => chat.chatId === chatId);

    res.status(200).json(chatById);
  } catch (error) {
    console.error("Failed to fetch chats", error);

    res.status(500).json({
      error: "Unable to fetch chats.",
    });
  }
});

app.post("/chat/create", async (req, res) => {
  const { userIds } = req.body || [];
  if (userIds.length < 2)
    return res.status(400).json({ error: "At least 2 user ids are required." });

  try {
    const chats = await readChatData();
    let newChatId = `chat-${chats.length + 1}`;
    const newChat = {
      chatId: newChatId,
      userIds: userIds,
      messages: [],
      lastMessageContent: "",
      lastMessageIsRead: true,
      openedChat: true,
    };

    chats.push(newChat);
    await writeChatData(chats);
    res.status(201).json(newChatId);
  } catch (error) {
    res.status(500).json({
      error: "Unable to create new chat.",
    });
  }
});

app.get("/chatPreviews", async (req, res) => {
  try {
    const chats = await readChatData();

    const chatPreviews = chats.map((chat) => ({
      chatId: chat.chatId,
      userIds: chat.userIds,
      lastMessageContent: chat.lastMessageContent,
      lastMessageIsRead: chat.lastMessageIsRead,
      openedChat: chat.openedChat,
    }));

    res.status(200).json(chatPreviews);
  } catch (error) {
    console.error("Failed to fetch chats", error);

    res.status(500).json({
      error: "Unable to fetch chats.",
    });
  }
});

app.patch("/chat/markAsRead/:chatId/:secondUserId", async (req, res) => {
  const { chatId, secondUserId } = req.params;

  try {
    const chats = await readChatData();

    const chatsUpdated = chats.map((chat) =>
      chat.chatId === chatId
        ? {
            ...chat,
            openedChat: true,
            messages: chat.messages.map((message) =>
              message.senderId === secondUserId
                ? { ...message, isRead: true }
                : message,
            ),
          }
        : chat,
    );

    await writeChatData(chatsUpdated);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({
      error: "Unable to mark chat as read.",
    });
  }
});

app.post("/sendMessage/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { senderId, text } = req.body || {};

  const { normalizedSenderId, normalizedText } = validateMessageInput(
    senderId,
    text,
  );

  if (!normalizedSenderId) {
    return res.status(400).json({
      error: "Sender id is required.",
    });
  }

  if (!normalizedText) {
    return res.status(400).json({
      error: "Message text is required.",
    });
  }

  try {
    const chats = await readChatData();
    const chat = chats.find((c) => c.chatId === chatId);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found.",
      });
    }

    if (!Array.isArray(chat.messages)) {
      chat.messages = [];
    }

    const newMessage = {
      messageId: `m-${chat.messages.length + 1}`,
      senderId: normalizedSenderId,
      content: normalizedText,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    chat.messages.push(newMessage);

    chat.lastMessageContent = normalizedText;
    chat.lastMessageIsRead = false;

    await writeChatData(chats);

    const addedMessage = chat.messages[chat.messages.length - 1];

    res.status(201).json(addedMessage);
  } catch (error) {
    console.error(`Failed to add message for chat ${chatId}`, error);

    res.status(500).json({
      error: "Unable to save message.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
