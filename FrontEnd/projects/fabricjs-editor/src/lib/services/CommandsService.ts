import { ICommand } from '../models/commands/ICommand';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  private undoCommands: ICommand[] = [];
  private redoCommands: ICommand[] = [];
  private history: string[] = [];

  public canUndo(): boolean {
    return this.undoCommands.length > 0;
  }

  public canRedo(): boolean {
    return this.redoCommands.length > 0;
  }

  public insert(command: ICommand): void {
    command.execute();
    this.history.push(command.type);
    this.undoCommands.push(command);
  }

  public redo(levels: number = 1): void {
    this.manage(levels, this.redoCommands, this.undoCommands, (command) => {
      command.execute();
      this.history.push(`REDO-${command.type}`);
    });
  }

  public undo(levels: number = 1): void {
    this.manage(levels, this.undoCommands, this.redoCommands, (command) => {
      command.unExecute();
      this.history.push(`UNDO-${command.type}`);
    });
  }

  private manage(
    levels: number,
    inCommands: ICommand[],
    outCommands: ICommand[],
    method: (command: ICommand) => void
  ): void {
    for (let i = 1; i <= levels; i++) {
      if (inCommands.length !== 0) {
        const command = inCommands.pop();
        method(command);
        outCommands.push(command);
      }
    }
  }
}
