import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class ModifiedCommand extends Command {
  protected object: fabric.Object;
  protected transform: any;
  protected original: any;

  public constructor(
    canvas: fabric.Canvas,
    object: fabric.Object,
    transform: any,
    original: any
  ) {
    super(canvas);
    this.object = object;
    this.transform = transform;
    this.original = original;
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
