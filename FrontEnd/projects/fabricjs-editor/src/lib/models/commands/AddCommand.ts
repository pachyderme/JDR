import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class AddCommand extends Command {
  public constructor(canvas: fabric.Canvas, protected object: fabric.Object) {
    super(canvas);
    this.type = CommandTypes.ADD_OBJECT;
  }

  public execute(): void {
    this.canvas.add(this.object);
  }

  public unExecute(): void {
    this.canvas.remove(this.object);
  }
}
