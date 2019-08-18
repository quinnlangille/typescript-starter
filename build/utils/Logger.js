"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var morgan_1 = __importDefault(require("morgan"));
var path = __importStar(require("path"));
var uuid = __importStar(require("uuid"));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Silly"] = 0] = "Silly";
    LogLevel[LogLevel["Verbose"] = 1] = "Verbose";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Error"] = 4] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(logLevel) {
        if (logLevel === void 0) { logLevel = LogLevel.Info; }
        var logger = winston_1.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston_1.format.combine(winston_1.format.json(), winston_1.format.label({ label: path.basename(process.mainModule.filename) }), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.metadata({
                fillExcept: ['message', 'level', 'timestamp', 'label'],
            }), winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.printf(function (info) {
                var message = info.timestamp + " [" + info.level + "]: ";
                if (info.metadata.stackTrace) {
                    message += " " + info.metadata.stackTrace;
                }
                else {
                    message += "" + info.message;
                }
                return message;
            })),
            transports: [
                new winston_1.transports.Console()
            ],
        });
        var morganOption = {
            stream: {
                write: function (message) {
                    logger.info(message.trim());
                },
            },
        };
        var morganFormat = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
        this.appLogger = logger;
        this.accessLogger = morgan_1.default(morganFormat, morganOption);
    }
    Logger.prototype.log = function (level, message) {
        var logLevel = this.getLogLevel(level);
        this.appLogger[logLevel](message);
    };
    Logger.prototype.info = function (message) {
        this.log(LogLevel.Info, message);
    };
    Logger.prototype.error = function (message) {
        this.log(LogLevel.Error, message);
    };
    Logger.prototype.warn = function (message) {
        this.log(LogLevel.Warn, message);
    };
    Logger.prototype.getAccessLogger = function () {
        return this.accessLogger;
    };
    Logger.prototype.generateRequestId = function () {
        return uuid.v4();
    };
    Logger.prototype.getLogLevel = function (level) {
        return typeof LogLevel[level] === 'string'
            ? LogLevel[level].toLowerCase()
            : 'log';
    };
    return Logger;
}());
exports.Logger = Logger;
