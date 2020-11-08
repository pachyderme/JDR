import { ICommand } from './ICommand';
import { CommandTypes } from './CommandTypes';

export abstract class Command implements ICommand {
  public type: CommandTypes | string;

  public constructor(protected canvas: fabric.Canvas) {}

  public abstract execute(): void;
  public abstract unExecute(): void;
}
