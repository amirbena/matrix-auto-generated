import { INestApplication, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MyModule } from "./MyModule";
import * as cookieParser from "cookie-parser";
import { PORT } from "./constants";

export class MyBackend {
  private application_?: INestApplication;

  public async open(): Promise<void> {
    //----
    // OPEN THE BACKEND SERVER
    //----
    // MOUNT CONTROLLERS
    this.application_ = await NestFactory.create(MyModule);
    this.application_.use(cookieParser());

    // DO OPEN
    this.application_.enableCors();
    await this.application_.listen(PORT, "0.0.0.0", () => Logger.log(`listens to ${PORT}`));

    //----
    // POST-PROCESSES
    //----
    // INFORM TO THE PM2
    if (process.send) process.send("ready");

    // WHEN KILL COMMAND COMES
    process.on("SIGINT", async () => {
      await this.close();
      process.exit(0);
    });
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    // DO CLOSE
    await this.application_.close();
    delete this.application_;
  }
}
