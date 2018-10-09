require("ts-node").register({
  project: "tsconfig.json",
  files: true,
});
const PORT = process.env.PORT || 3000;
require("./src/server/app").start(PORT);
