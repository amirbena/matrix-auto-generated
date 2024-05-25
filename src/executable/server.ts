import fs from "fs";
import { MyBackend } from "../MyBackend";


const EXTENSION = __filename.substring(__filename.length - 2);
if (EXTENSION === "js") require("source-map-support/register");




async function main(): Promise<void> {
  // BACKEND SEVER
  const backend: MyBackend = new MyBackend();
  await backend.open();

}
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
