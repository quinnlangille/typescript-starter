import { App } from './App';

function uncaughtException(err: Error): void {
  console.error(err.message, null, ['uncaught', 'exception'], {
    stack: err.stack,
  });
  process.exit(1);
}

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', (reason: any, p: Promise<any>) => {
  console.error(
    `Unhandled Rejection at: Promise', ${p}, reason: ${reason}`,
    null,
    ['unhandled', 'rejection']
  );
});

const app = new App();

app.start();
