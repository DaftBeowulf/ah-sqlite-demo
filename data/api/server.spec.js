const server = require("./server");
const db = require("../config/dbConfig");
const request = require("supertest");

describe("server.js", () => {
  afterEach(async () => {
    await db("monsters").truncate();
  });

  describe("sanity check", () => {
    it("should return status 200", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });

    it("should return a friendly message", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({
        message: "Server's running, bro. You're not insane at all."
      });
    });
  });

  describe("get(/api/monsters)", () => {
    it("returns array of all monsters", async () => {
      let response = await request(server).get("/api/monsters");
      expect(response.body).toHaveLength(0);
      await db("monsters").insert({ name: "Gargamel" });
      response = await request(server).get("/api/monsters");
      expect(response.body).toHaveLength(1);
    });

    it("returns status 200", async () => {
      let response = await request(server).get("/api/monsters");
      expect(response.status).toBe(200);
    });

    describe("get/:id", () => {
      it("returns a single monster if it exists", async () => {
        await db("monsters").insert({ name: "Gargamel" });

        let response = await request(server).get("/api/monsters/1");
        expect(response.body).toEqual({ id: 1, name: "Gargamel" });
      });
    });
  });

  describe("post(/api/monsters)", () => {
    it("should return status 201", async () => {
      const gargy = { name: "Gargamel" };

      let response = await request(server)
        .post("/api/monsters")
        .send(gargy);
      expect(response.status).toBe(201);
    });

    it("returns the new monster", async () => {
      const gargy = { name: "Gargamel" };

      let response = await request(server)
        .post("/api/monsters")
        .send(gargy);
      expect(response.body).toEqual({ id: 1, name: "Gargamel" });
    });

    it("returns status 400 if bad form", async () => {
      const gargy = { username: "Gargamel" };

      let response = await request(server)
        .post("/api/monsters")
        .send(gargy);

      expect(response.status).toBe(400);
    });
  });
});
