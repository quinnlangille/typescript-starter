"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var Registry_1 = require("./Registry");
var port = process.env.PORT || 3000;
var App = /** @class */ (function () {
    function App() {
        this.shutdownWaitTimeout = +process.env.SHUTDOWN_TIMEOUT || 30000;
    }
    App.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inversifyServer;
            var _this = this;
            return __generator(this, function (_a) {
                inversifyServer = new inversify_express_utils_1.InversifyExpressServer(Registry_1.Registry);
                this.logger = Registry_1.Registry.get('logger');
                inversifyServer.setConfig(function (app) {
                    // set up middleware
                    app.use(_this.logger.getAccessLogger());
                    // set up routes here
                    app.get('/', function (req, res) { return res.send('Hello World!'); });
                });
                return [2 /*return*/, inversifyServer.build()];
            });
        });
    };
    App.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var port, host, _a, listener;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        port = +process.env.PORT || 3000;
                        host = process.env.HOST || '0.0.0.0';
                        // start server;
                        _a = this;
                        return [4 /*yield*/, this.init()];
                    case 1:
                        // start server;
                        _a.server = _b.sent();
                        listener = this.server.listen(port, host, function (err) {
                            if (err) {
                                _this.logger.error(err.message);
                            }
                            _this.logger.info("Listening on port " + port + "!");
                        });
                        this.listener = listener;
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.stop = function () {
        var _this = this;
        if (this.listener) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.listener.close()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, resolve()];
                            case 2:
                                e_1 = _a.sent();
                                return [2 /*return*/, reject(e_1)];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, _this.shutdownWaitTimeout);
            });
        }
        else {
            return Promise.resolve();
        }
    };
    return App;
}());
exports.App = App;
