"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
function uncaughtException(err) {
    console.error(err.message, null, ['uncaught', 'exception'], {
        stack: err.stack,
    });
    process.exit(1);
}
process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', function (reason, p) {
    console.error("Unhandled Rejection at: Promise', " + p + ", reason: " + reason, null, ['unhandled', 'rejection']);
});
var app = new App_1.App();
app.start();
