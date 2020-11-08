import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class UpdateShapeCommand extends Command {
  public constructor(
    canvas: fabric.Canvas,
    protected oldObject: fabric.Object,
    protected newObject: fabric.Object,
    protected onExecute?: (object: fabric.Object) => void,
    protected onUnExecute?: (object: fabric.Object) => void
  ) {
    super(canvas);
    this.type = CommandTypes.UPDATE_OBJECT_SHAPE;
  }

  public execute(): void {
    this.canvas.remove(this.oldObject);
    this.canvas.add(this.newObject);
    if (this.onExecute) {
      this.onExecute(this.newObject);
    }
  }

  public unExecute(): void {
    this.canvas.remove(this.newObject);
    this.canvas.add(this.oldObject);
    if (this.onUnExecute) {
      this.onUnExecute(this.oldObject);
    }
  }
}
