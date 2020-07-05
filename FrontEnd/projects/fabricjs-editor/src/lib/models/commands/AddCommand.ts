import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class AddCommand extends Command {
  protected object: fabric.Object;

  public constructor(canvas: fabric.Canvas, object: fabric.Object) {
    super(canvas);
    this.object = object;
    this.type = CommandTypes.ADD_OBJECT;
  }

  public execute(): void {
    this.canvas.add(this.object);
  }

  public unExecute(): void {
    this.canvas.remove(this.object);
  }
}
