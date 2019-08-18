"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clean_stack_1 = __importDefault(require("clean-stack"));
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message, code, name, location) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.code = code;
        _this.name = name;
        Error.captureStackTrace(_this, location);
        _this.stackTrace = clean_stack_1.default(_this.stack);
        return _this;
    }
    BaseError.prototype.toJSON = function () {
        return {
            error: {
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        };
    };
    return BaseError;
}(Error));
exports.BaseError = BaseError;
