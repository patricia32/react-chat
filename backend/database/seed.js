const db = require("./database");
const { randomUUID } = require("crypto");

const users = [
  { name: "Jacob Jones", active: 1 },
  { name: "John Smith", active: 1 },
  { name: "Emily Johnson", active: 0 },
  { name: "Michael Brown", active: 0 },
  { name: "Sophia Williams", active: 1 },
  { name: "Daniel Taylor", active: 0 },
  { name: "Lucas Anderson", active: 0 },
  { name: "Olivia Martinez", active: 1 },
  { name: "Ethan Walker", active: 1 },
  { name: "Ava Thompson", active: 1 },
];

const insertUser = db.prepare(`
    INSERT INTO users(user_id, name, is_active)
    VALUES (?, ?, ?)
`);

users.forEach((user) => {
  //insertUser.run(randomUUID(), user.name, user.active);
});

// users

console.log("Users seeded.");
