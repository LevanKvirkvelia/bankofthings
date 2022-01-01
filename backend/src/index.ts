const dotenv = require("dotenv");
dotenv.config();

import Moralis from "moralis/node";
import { mongoConnect } from "./libs/mongo";

const serverUrl = "https://oam0o2ny6nfp.usemoralis.com:2053/server";
const appId = "t0Nv4m9GahmlrffqRMCCzeWKJdmCzcKrmoUcOpe5";

Promise.all([
  Moralis.start({ serverUrl, appId }), //
  mongoConnect(),
]).then(() => {
  import("./app");
});
