"use strict";
import { Server } from "./server";

/**
 * Path to a settings file storing server settings.
 */
const settingsFileName: string = "hsh.json";

Server.createFromFile(settingsFileName)
    .then((server: Server): void => server.run())
    .catch(error => console.error(`${error}\n:(`));
