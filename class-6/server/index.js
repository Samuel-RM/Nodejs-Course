import express from "express";
import logger from "morgan";
import dotenv from "dotenv";

// Library to use turso
import { createClient } from "@libsql/client";

import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: "libsql://midu-samuel-rm.turso.io",
  // authToken: process.env.DB_TOKEN3,
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcxMDgwNzksImlkIjoiZDZjMGUzM2QtYzNkMS0xMWVlLWIwNzEtNTIwNTNjNGIyM2E2In0.dDNOKcYQEedM4IuHPQn5x1Agwy8SWlTxQ_T7mRI3iXJFDC25sXkMO4TIMsjXQ1551gwOmpsjrR0klNT2XCtZCA",
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`);

io.on("connection", async (socket) => {
  console.log("a user has connected");

  socket.on("disconnect", () => {
    console.log("A user a disconnected");
  });

  socket.on("chat message", async (msg) => {
    let results;
    try {
      results = await db.execute({
        sql: `INSERT INTO messages (content) VALUES (:messages)`,
        args: { messages: msg },
      });
    } catch (e) {
      console.error(e);
      return;
    }

    io.emit("chat message", msg, results.lastInsertRowid.toString());
  });

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: "SELECT id, content FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit("chat message", row.content, row.id.toString());
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

app.get("/a", (req, res) => {
  res.sendFile(process.cwd() + "/client/index2.html");
});

server.listen(port, () => {
  console.log(`Server runnung on port  http://localhost:${port}`);
});
