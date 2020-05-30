import "reflect-metadata";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";
import express from "express";
import { Server as HttpServer } from "http";
import { Logger, LogLevel } from "./utils/Logger";
import { Registry } from "./Registry";
import { BadRequestError } from "./entities/Errors/BadRequest";

const port = process.env.PORT || 3000;

export class App {
  public server: any;
  public listener: HttpServer;
  private shutdownWaitTimeout: number = +process.env.SHUTDOWN_TIMEOUT || 30000;
  private logger: Logger;

  constructor() {}

  public async init(): Promise<Express.Application> {
    const inversifyServer = new InversifyExpressServer(Registry);
    this.logger = Registry.get<Logger>("logger");

    inversifyServer.setConfig((app) => {
      // set up middleware
      app.use(this.logger.getAccessLogger());

      // set up routes here
      app.get("/", (req, res) => res.send("Hello World!"));
    });

    return inversifyServer.build();
  }

  public async start() {
    const port = +process.env.PORT || 3000;
    const host = process.env.HOST || "0.0.0.0";

    // start server;
    this.server = await this.init();

    const listener = this.server.listen(port, host, (err: Error) => {
      if (err) {
        this.logger.error(err.message);
      }
      this.logger.info(`Listening on port ${port}!`);
    });

    this.listener = listener;
  }

  public stop(): Promise<void> {
    if (this.listener) {
      return new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          try {
            await this.listener.close();
            return resolve();
          } catch (e) {
            return reject(e);
          }
        }, this.shutdownWaitTimeout);
      });
    } else {
      return Promise.resolve();
    }
  }
}
