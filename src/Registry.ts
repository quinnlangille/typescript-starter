import "reflect-metadata";
import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";
import { Logger } from "./utils/Logger";
import { StatusService } from "./services/StatusService";
import { StatusController } from "./controllers/StatusController";

const Registry = new Container();
const logger = new Logger();

// Register Utils
Registry.bind<Logger>("logger").toConstantValue(logger);

// Register Controllers
Registry.bind<StatusController>("controller")
  .to(StatusController)
  .inSingletonScope()
  .whenTargetNamed("status");

// Register Services
Registry.bind<StatusService>("service")
  .to(StatusService)
  .inSingletonScope()
  .whenTargetNamed("status");

export { Registry };
