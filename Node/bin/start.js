"ude strict";

require("@babel/polyfill");
require("@babel/register");
require("dotenv").config();

const port = require("../config").get(process.env.ENVIRONMENT).api_port;

const app = require("../app").default;
const http = require("http");

const server = http.createServer(app);
server.listen(port);

server.on("listening", () => {
  console.log("Listening to port :", port);
});
