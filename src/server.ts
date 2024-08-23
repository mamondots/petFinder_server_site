import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;

async function main() {
  server = app.listen(config.port, () => {
    console.log(`Pet Adoption server is ready at http://localhost:${config.port}`);
  });
}

main();