import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class ModifiedCommand extends Command {
  public constructor(
    canvas: fabric.Canvas,
    protected object: fabric.Object,
    protected transform: any,
    protected original: any
  ) {
    super(canvas);
    this.type = CommandTypes.MODIFIED_OBJECT;
  }

  public execute(): void {
    this.object.set(this.transform);
    this.object.setCoords();
    this.canvas.renderAll();
  }

  public unExecute(): void {
    this.object.set(this.original);
    this.object.setCoords();
    this.canvas.renderAll();
  }
}
