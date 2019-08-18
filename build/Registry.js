"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var Logger_1 = require("./utils/Logger");
var StatusService_1 = require("./services/StatusService");
var StatusController_1 = require("./controllers/StatusController");
var Registry = new inversify_1.Container();
exports.Registry = Registry;
var logger = new Logger_1.Logger();
// Register Utils
Registry.bind('logger').toConstantValue(logger);
// Register Controllers
Registry.bind('controller').to(StatusController_1.StatusController).inSingletonScope().whenTargetNamed('status');
// Register Services
Registry.bind('service').to(StatusService_1.StatusService).inSingletonScope().whenTargetNamed('status');
