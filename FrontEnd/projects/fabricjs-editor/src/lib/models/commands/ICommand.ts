import { CommandTypes } from './CommandTypes';

export interface ICommand {
  type: CommandTypes | string;
  execute(): void;
  unExecute(): void;
}
