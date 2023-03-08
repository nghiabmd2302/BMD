import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import { ConnectDb } from "./utils/data-source";
import {Server} from "./Server";

async function bootstrap() {
  try {
    ConnectDb()
    // process.on("uncaughtException", (err) => {
    //   console.log(`Error: ${err.message}`);
    //   console.log(`Shutting down the server due to Uncaught Exception`);
    //   process.exit(1);
    // });
    
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {});

    await platform.listen();
    $log.debug("Server initialized");

    // process.on("unhandledRejection", (err) => {
    //   console.log(`Error: ${err}`);
    //   console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    
    //   process.exit(1);
    // });
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
