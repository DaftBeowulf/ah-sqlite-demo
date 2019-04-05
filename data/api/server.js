const express = require("express");
const db = require("../config/dbConfig");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

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

server.get("/api/monsters", restricted, async (req, res) => {
  try {
    const monsters = await db("monsters");
    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).json({ message: `Couldn't retrieve monsters: ${error}` });
  }
});

server.get("/api/monsters/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const monster = await db("monsters")
      .join("nightmares_monsters", {
        "monsters.id": "nightmares_monsters.monster_id"
      })
      .join("nightmares", {
        "nightmares_monsters.nightmare_id": "nightmares.id"
      })
      .select("monsters.name as Monster", "nightmares.type as Nightmare")
      .where({ "monsters.id": id })
      .first();
    res.status(200).json(monster);
    // const monster = await db("monsters")
    //   .where({ id })
    //   .first();
    // monster
    //   ? res.status(200).json(monster)
    //   : res.status(404).json({
    //       message: "That monster doesn't exist... except in your dreams"
    //     });
  } catch (error) {
    res.status(500).json({ message: `Couldn't retrieve monsters: ${error}` });
  }
});

module.exports = server;
