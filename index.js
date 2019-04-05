const server = require("./data/api/server");

const port = 5000;

server.listen(port, () => {
  console.log(`\n=== Server's running on port ${port} ===\n`);
});
