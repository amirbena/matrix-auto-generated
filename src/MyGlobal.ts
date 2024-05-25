import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia from "typia";

/* eslint-disable */
export class MyGlobal {
  public static testing: boolean = false;
}
export namespace MyGlobal {
  export interface IEnvironments {
    PROJECT_API_PORT: `${number}`;
    TOKEN_KEY: string;
  }
}
