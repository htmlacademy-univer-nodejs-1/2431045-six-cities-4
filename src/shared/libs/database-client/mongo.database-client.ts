import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';

import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

import { DatabaseClient } from './database-client.interface.js';

const RETRY_COUNT = 5;
// RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect({uri, params}: {uri:string, params: {
    authSource:string;
    user:string;
    pass:string;
  }}): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');
    this.logger.info(`URI: ${uri}`);

    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri, params);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        //await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
