import fs from "fs";
import path from "path";

import { MyGlobal } from "./MyGlobal";
import { PORT } from "./constants";

export namespace MyConfiguration {
  export const API_PORT = () => Number(PORT);

  export const ROOT = (() => {
    console.log(path, path.sep);
    const splitted: string[] = __dirname.split(path.sep);
    return splitted.at(-1) === "src" && splitted.at(-2) === "bin"
      ? path.resolve(__dirname + "/../..")
      : fs.existsSync(__dirname + "/.env")
        ? __dirname
        : path.resolve(__dirname + "/..");
  })();
}
