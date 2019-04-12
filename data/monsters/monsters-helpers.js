const db = require("../config/dbConfig");

module.exports = {
  getAll,
  getById,
  insert
};

function getAll() {
  return db("monsters");
}

function getById(id) {
  return db("monsters")
    .where({ id })
    .first();
  // .join("nightmares_monsters", {
  //   "monsters.id": "nightmares_monsters.monster_id"
  // })
  // .join("nightmares", {
  //   "nightmares_monsters.nightmare_id": "nightmares.id"
  // })
  // .select("monsters.name as Monster", "nightmares.type as Nightmare")
}

async function insert(monster) {
  const [id] = await db("monsters").insert(monster);
  return db("monsters")
    .where({ id })
    .first();
}
