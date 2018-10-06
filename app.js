require("ts-node/register")
const PORT = process.env.PORT || 3000;
require("./src/server/app").start(PORT);
