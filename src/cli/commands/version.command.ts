import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
    version: string;
}

function isPackageJSONConfig(data:unknown): data is PackageJSONConfig{
  return(
    typeof data === 'object' &&
        data !== null &&
        !Array.isArray(data) &&
        Object.hasOwn(data, 'version')
  );
}

export class VersionCommand implements Command{

  constructor(
        private readonly filePath: string = './package.json'
  ){}

  private readVersion():string{
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const readContent: unknown = JSON.parse(jsonContent);

    if(!isPackageJSONConfig(readContent)){
      throw new Error('Failed to parse json content');
    }

    return readContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try{
      const version = this.readVersion();
      console.info(chalk.blue(version));
    } catch(error: unknown){
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

}
