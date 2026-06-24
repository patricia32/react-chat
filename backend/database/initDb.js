const db = require("./database");

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        is_active INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS chat(
        chat_id TEXT PRIMARY KEY,
        user1_id TEXT NOT NULL,
        user2_id TEXT NOT NULL,
        is_archived INTEGER NOT NULL DEFAULT 0,
        last_message_id TEXT,

        FOREIGN KEY (user1_id) REFERENCES users(user_id),
        FOREIGN KEY (user2_id) REFERENCES users(user_id),
        FOREIGN KEY (last_message_id) REFERENCES message(message_id)
    );
    CREATE TABLE IF NOT EXISTS message( 
        message_id TEXT PRIMARY KEY, 
        message_chat_id TEXT NOT NULL, 
        sender_id TEXT NOT NULL, 
        content TEXT NOT NULL, 
        created_at DATETIME NOT NULL, 
        is_read INTEGER NOT NULL DEFAULT 0, 
        
        FOREIGN KEY (chat_id) REFERENCES chat(message_chat_id), 
        FOREIGN KEY (sender_id) REFERENCES users(user_id) 
    );

`);

const clearDb = db.transaction(() => {
  db.prepare("UPDATE chat SET last_message_id = NULL").run();
  db.prepare("DELETE FROM message").run();
  db.prepare("DELETE FROM chat").run();
});

// clearDb();

// db.prepare(
//   `
//   INSERT INTO message (
//     message_id,
//     message_chat_id,
//     sender_id,
//     content,
//     created_at,
//     is_read
//   )
//   VALUES (?, ?, ?, ?, ?, ?)
// `,
// ).run(
//   crypto.randomUUID(),
//   "3a6b222d-4899-419b-acb0-e2af8964adc5", // chat id
//   "412d0423-b106-48ea-bfc4-fcc2f2e613ac", // sender_id
//   "How are you?",
//   "2025-06-24T11:00:00.000Z",
//   0,
// );

// db.prepare(
//   `
//   UPDATE chat
//   SET last_message_id = ?
//   WHERE chat_id = ?
// `,
// ).run(
//   "0838bc33-5e50-4023-bdf3-ee34d1f40485",
//   "3a6b222d-4899-419b-acb0-e2af8964adc5",
// );

db.prepare(
  `
  UPDATE message
  SET is_read = 1
  WHERE message_id = ?
`,
).run("07bc51ca-3312-4272-abf4-99f3f0e35ac7");

console.log("Database initialized.");

const tables = db
  .prepare(
    `
    SELECT name
    FROM sqlite_master
    WHERE type='table'
`,
  )
  .all();

console.log(tables);
