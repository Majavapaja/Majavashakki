require("ts-node/register")
const PORT = process.env.PORT || 3000;
console.log("PORT ===", PORT)
require("./src/server/app").start(PORT);
