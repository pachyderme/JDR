import { ICommand } from './ICommand';
import { CommandTypes } from './CommandTypes';

export abstract class Command implements ICommand {
  protected canvas: fabric.Canvas;
  public type: CommandTypes | string;

  public constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
  }

  public abstract execute(): void;
  public abstract unExecute(): void;
}
