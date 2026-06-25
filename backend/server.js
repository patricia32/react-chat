const express = require("express");
const fs = require("fs/promises");
const path = require("path");
require("./database/initDb");
require("./database/seed");
const db = require("./database/database");
const { randomBytes, randomUUID } = require("crypto");
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

// app.get("/getUserById/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const users = await readUsersData();
//     const userById = users.filter((user) => user.id === userId);
//     res.status(200).json(userById[0]);
//   } catch (error) {
//     console.error(`Failed to fetch user with id ${userId}`, error);

//     res.status(500).json({
//       error: `Failed to fetch user with id ${userId}.`,
//     });
//   }
// });

app.get("/getUserById/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const userById = db
      .prepare(
        `
            SELECT *
            FROM users
            WHERE user_id = ?
        `,
      )
      .get(userId);

    if (!userById)
      return res.status(404).json({
        error: "User not found",
      });

    res.status(200).json(userById);
  } catch (error) {
    console.error(`Failed to fetch user with id ${userId}`, error);

    res.status(500).json({
      error: `Failed to fetch user with id ${userId}.`,
    });
  }
});

app.get("/getActiveUsers", async (req, res) => {
  try {
    const activeUsers = db
      .prepare(
        `
      SELECT * 
      FROM users
      WHERE is_active=1
      `,
      )
      .all();

    res.status(200).json(activeUsers);
  } catch (error) {
    console.error("Failed to fetch users", error);

    res.status(500).json({
      error: "Unable to fetch users.",
    });
  }
});

app.get("/chat/getChatById/:chat_id", async (req, res) => {
  try {
    const { chat_id } = req.params;
    const chat = db
      .prepare(
        `
        SELECT
          c.*,
          m.*
        FROM chat c
        LEFT JOIN message m
          ON c.chat_id = m.message_chat_id
        WHERE c.chat_id = ?
        ORDER BY m.created_at ASC
      `,
      )
      .get(chat_id);
    res.status(200).json(chat);
  } catch (error) {
    console.error("Failed to fetch chats", error);

    res.status(500).json({
      error: "Unable to fetch chats.",
    });
  }
});

app.get(
  "/chat/getChatIdByUserIds/:loggedUserId/:secondUserId",
  async (req, res) => {
    try {
      const { loggedUserId, secondUserId } = req.params;
      const chat_id = db
        .prepare(
          `
            SELECT chat_id
            FROM chat
            WHERE (user1_id = ? AND user2_id = ?)
              OR (user2_id = ? AND user1_id = ?)
          `,
        )
        .get(loggedUserId, secondUserId, secondUserId, loggedUserId);
      if (chat_id) res.status(200).json(chat_id);
      else res.status(404).json("Could not find chat");
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch chat id" });
    }
  },
);

app.post("/chat/create", async (req, res) => {
  const { userIds } = req.body || [];
  if (!Array.isArray(userIds) || userIds.length !== 2)
    return res.status(400).json({
      error: "Exactly 2 user ids are required.",
    });

  try {
    const chat = db.prepare(
      `
        INSERT INTO chat (chat_id, user1_id, user2_id, is_archived, last_message_id) 
        VALUES(?, ?, ?, ?, ?)
      `,
    );
    const newChatId = randomUUID();

    chat.run(newChatId, userIds[0], userIds[1], 0, null);
    res.status(201).json(newChatId);
  } catch (error) {
    res.status(500).json({
      error: "Unable to create new chat.",
    });
  }
});

app.get("/chatPreviews/:loggedUserId", (req, res) => {
  try {
    const { loggedUserId } = req.params;
    const chatPreviews = db
      .prepare(
        `
      SELECT
        c.chat_id,
        c.is_archived,
        c.user1_id,
        c.user2_id,
        m.message_id,
        m.sender_id AS last_message_sender_id,
        m.content AS last_message_content,
        m.created_at AS last_message_at,
        m.is_read AS last_message_is_read,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM message m2
                WHERE m2.message_chat_id = c.chat_id
                  AND m2.sender_id != ?
                  AND m2.is_read = 0
            )
            THEN FALSE
            ELSE TRUE
        END AS is_open
      FROM chat c
      LEFT JOIN message m
        ON c.last_message_id = m.message_id
      ORDER BY m.created_at DESC
    `,
      )
      .all(loggedUserId);

    res.status(200).json(chatPreviews);
  } catch (error) {
    console.error("Failed to fetch chats", error);

    res.status(500).json({
      error: "Unable to fetch chats.",
    });
  }
});

app.get("/chat/getMessages/:chat_id", (req, res) => {
  try {
    const { chat_id } = req.params;
    const messages = db
      .prepare(
        `
          SELECT * 
          FROM message
          WHERE message_chat_id = ?
          ORDER BY created_at ASC
        `,
      )
      .all(chat_id);

    if (!messages) messages = [];
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages", error);

    res.status(500).json({
      error: "Unable to fetch messages.",
    });
  }
});

app.patch("/chat/markAsRead/:chat_id/:second_user_id", async (req, res) => {
  const { chat_id, second_user_id } = req.params;

  try {
    db.prepare(
      `
      UPDATE message
      SET is_read = 1
      WHERE message_chat_id = ? and sender_id = ?
    `,
    ).run(chat_id, second_user_id);

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({
      error: "Unable to mark chat as read.",
    });
  }
});

app.post("/sendMessage/:chat_id", async (req, res) => {
  const { chat_id } = req.params;
  const { sender_id, content } = req.body || {};

  const { normalizedSenderId, normalizedText } = validateMessageInput(
    sender_id,
    content,
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
    const insertMessage = db.prepare(`
      INSERT INTO message (
        message_id,
        message_chat_id,
        sender_id,
        content,
        created_at,
        is_read
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const message = {
      message_id: crypto.randomUUID(),
      message_chat_id: chat_id,
      sender_id: sender_id,
      content: content,
      created_at: new Date().toISOString(),
      is_read: 0,
    };

    insertMessage.run(
      message.message_id,
      message.message_chat_id,
      message.sender_id,
      message.content,
      message.created_at,
      message.is_read,
    );

    db.prepare(
      `
      UPDATE chat
      SET last_message_id = ?
      WHERE chat_id = ?
    `,
    ).run(message.message_id, message.message_chat_id);

    res.status(201).json(message);
  } catch (error) {
    console.error(`Failed to store message ${content}`, error);

    res.status(500).json({
      error: "Unable to save message.",
    });
  }
});

app.get("/user/getUsersByNameSearch/:searchInput", async (req, res) => {
  const { searchInput } = req.params;
  try {
    const users = db
      .prepare(
        `
        SELECT *
        FROM users
        WHERE name LIKE CONCAT('%', ?, '%');
      `,
      )
      .all(searchInput);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch users search.`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
