const express = require("express");
const db = require("../config/dbConfig");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

const Monsters = require("../monsters/monsters-helpers");

const restricted = require("../middleware/restricted");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, userRouter);
server.use("/api/auth", authRouter);

//sanity check
server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Server's running, bro. You're not insane at all." });
});

//temp remove restricted
server.get("/api/monsters", async (req, res) => {
  try {
    const monsters = await Monsters.getAll();
    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).json({ message: `Couldn't retrieve monsters: ${error}` });
  }
});

//temp remove restricted
server.get("/api/monsters/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const monster = await Monsters.getById(id);
    res.status(200).json(monster);
  } catch (error) {
    res.status(500).json({ message: `Couldn't retrieve monsters: ${error}` });
  }
});

server.post("/api/monsters", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "You bad" });
  }
  try {
    const monster = await Monsters.insert(req.body);
    res.status(201).json(monster);
  } catch (error) {
    res.status(500).json({ error: `There be an ${error}` });
  }
});

module.exports = server;
