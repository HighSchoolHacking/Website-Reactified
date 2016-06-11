/// <reference path="../../typings/all.d.ts" />

"use strict";
import * as express from "express";
import * as http from "http";
import * as fsp from "fs-promise";

/**
 * Settings to initialize a new Server.
 */
export interface IServerSettings {
    /**
     * Which port to use, if not the default.
     */
    port?: number;
}

/**
 * Management server for an assassins game.
 */
export class Server {
    /**
     * Running express application responding to requests.
     */
    private app: any;

    /**
     * User-specified server settings.
     */
    private settings: IServerSettings;

    /**
     * Running http server routing requests to the app.
     */
    private server: http.Server;

    /**
     * Whether the server is currently running.
     */
    private running: boolean = false;

    /**
     * Initializes a new instance of the Server class.
     * 
     * @param settings   User-specified server settings.
     */
    public constructor(settings: IServerSettings) {
        this.settings = settings;

        this.app = express();
        this.app.use(express.static("src/site"));
        this.app.use("/node_modules", express.static("node_modules"));

        this.server = http.createServer(this.app);
    }

    /**
     * Starts listening for requests.
     */
    public run(): void {
        if (this.running) {
            throw new Error("Server is already running!");
        }

        this.server.listen(
            this.settings.port,
            (): void => console.log(`Starting listening on port ${this.settings.port}...`));

        this.running = true;
    }

    /**
     * Loads a settings file to create a Server.
     * 
     * @param filePath   Settings file path.
     * @returns Promise for a new Server.
     */
    public static createFromFile(filePath: string): Promise<Server> {
        return fsp.exists(filePath)
            .then(exists => {
                if (!exists) {
                    throw new Error(`'${filePath}' not found.\nMake sure you copied '${filePath.replace(".json", ".default.json")}' to '${filePath}'.`);
                }
            })
            .then(() => {
                return fsp.readFile(filePath)
                    .then((data: Buffer): Server => new Server(JSON.parse(data.toString())))
                    .catch((error: Error): void => {
                        console.error("Could not create server.");
                        console.error(error);
                    });
            });
    }
}
