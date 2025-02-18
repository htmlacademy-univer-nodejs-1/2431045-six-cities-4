type ParseCommand = Record<string, string[]>

export class CommandParser{
    static parse(cliAguments:string[]): ParseCommand{
        const commands: ParseCommand = {}
        let currentCommand = '';

        for(const argument of cliAguments){
            if(argument.startsWith('--')){
                commands[argument] = [];
                currentCommand = argument;
            }
            else if(currentCommand && argument){
                commands[currentCommand].push(argument)
            }
        }

        return commands;
    }
}