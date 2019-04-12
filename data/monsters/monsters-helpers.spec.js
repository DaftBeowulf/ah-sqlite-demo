const db = require("../config/dbConfig");
const Monsters = require("./monsters-helpers");

describe("monsters-helpers.js", () => {
  beforeEach(async () => {
    await db("monsters").truncate();
  });

  afterEach(async () => {
    await db("monsters").truncate();
  });

  describe("getAll()", () => {
    it("returns a list of all monsters", async () => {
      await Monsters.insert({
        name: "Freddy Kreuger"
      });
      await Monsters.insert({
        name: "Papa Smurf"
      });
      const monsters = await Monsters.getAll();
      expect(monsters.length).toBe(2);
    });
  });

  describe("getById()", () => {
    it("return a specific monster by the id", async () => {
      const monster = await Monsters.insert({
        name: "Freddy Kreuger"
      });

      const freddy = await Monsters.getById(monster.id);
      const expected = { name: "Freddy Kreuger", id: 1 };

      expect(freddy).toEqual(expected);
    });

    it("returns undefined if monster by id doesn't exist", async () => {
      const monster = await Monsters.getById(100);
      expect(monster).toBeUndefined();
    });
  });

  describe("insert()", () => {
    it("returns the new monster", async () => {
      const newMon = { name: "Gargamel" };
      const monster = await Monsters.insert(newMon);
      expect(monster).toEqual({ name: "Gargamel", id: 1 });
    });

    it("successfully inserts new monster in the database", async () => {
      const garg = await Monsters.insert({ name: "Gargamel" });
      const [monster] = await db("monsters").where({ id: garg.id });
      expect(monster).toEqual({ name: "Gargamel", id: 1 });
    });
  });

  it.skip("returns something bad if passed a non-schema monster", async () => {
    const newMon = { username: "Gargamel" };
    // const monster = await Monsters.insert(newMon);

    //todo: come back to this one--how to check for thrown SQLite error?
    expect(Monsters.insert(newMon)).toThrow({});
  });
});
