import { Command } from './Command';
import { CommandTypes } from './CommandTypes';

export class RemoveCommand extends Command {
  public constructor(canvas: fabric.Canvas, protected object: fabric.Object) {
    super(canvas);
    this.type = CommandTypes.REMOVE_OBJECT;
  }

  public execute(): void {
    switch (this.object.type.toLowerCase()) {
      case 'group':
        const objects = (this.object as fabric.Group).getObjects();
        this.canvas.remove(...objects);
        break;
      default:
        this.canvas.remove(this.object);
        break;
    }
  }

  public unExecute(): void {
    switch (this.object.type.toLowerCase()) {
      case 'group':
        const objects = (this.object as fabric.Group).getObjects();
        this.canvas.add(...objects);
        break;
      default:
        this.canvas.add(this.object);
        break;
    }
  }
}
