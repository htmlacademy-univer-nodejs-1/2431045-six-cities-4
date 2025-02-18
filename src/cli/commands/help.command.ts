import chalk from "chalk";
import { Command } from "./command.interface.js";

export class HelpCommand implements Command{

    public getName(): string {
        return '--help'
    }

    public execute(..._parameters: string[]): void {
        console.info(chalk.green(`
            Программа для подготовки данных для REST API сервера.  

            Пример: cli.js --<command> [--arguments]

            Команды:

            ${chalk.blue(`--version`)}:                   # выводит номер версии
            ${chalk.yellow(`--help`)}:                      # печатает этот текст
            ${chalk.red(`--import`)} ${chalk.red.bgBlack.bold(`<path>`)}:             # импортирует данные из TSV
            ${chalk.bgMagentaBright(`--generate <n> <path> <url>`)}  # генерирует произвольное количество тестовых данных
            `))
    }
}