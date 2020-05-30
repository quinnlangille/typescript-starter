import { createLogger, format, transports } from "winston";
import morgan, { Options } from "morgan";
import * as path from "path";
import * as uuid from "uuid";

export enum LogLevel {
  Silly = 0,
  Verbose = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
}

export class Logger {
  private accessLogger;
  private appLogger;

  constructor(logLevel: LogLevel = LogLevel.Info) {
    const logger = createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: format.combine(
        format.json(),
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.metadata({
          fillExcept: ["message", "level", "timestamp", "label"],
        }),
        format.colorize(),
        format.splat(),
        format.printf((info: any): any => {
          let message = `${info.timestamp} [${info.level}]: `;

          if (info.metadata.stackTrace) {
            message += ` ${info.metadata.stackTrace}`;
          } else {
            message += `${info.message}`;
          }

          return message;
        })
      ),
      transports: [new transports.Console()],
    });

    const morganOption: Options = {
      stream: {
        write: function (message: string) {
          logger.info(message.trim());
        },
      },
    };

    const morganFormat =
      process.env.NODE_ENV === "development" ? "dev" : "combined";

    this.appLogger = logger;
    this.accessLogger = morgan(morganFormat, morganOption);
  }

  public log(level: LogLevel, message): void {
    const logLevel = this.getLogLevel(level);
    this.appLogger[logLevel](message);
  }

  public info(message): void {
    this.log(LogLevel.Info, message);
  }

  public error(message): void {
    this.log(LogLevel.Error, message);
  }

  public warn(message): void {
    this.log(LogLevel.Warn, message);
  }

  public getAccessLogger() {
    return this.accessLogger;
  }

  public generateRequestId(): string {
    return uuid.v4();
  }

  private getLogLevel(level: LogLevel): string {
    return typeof LogLevel[level] === "string"
      ? LogLevel[level].toLowerCase()
      : "log";
  }
}
