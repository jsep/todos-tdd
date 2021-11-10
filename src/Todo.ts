import {v4 as uuidv4} from 'uuid';

export class Todo {
  active = true;
  completed = false;
  id = uuidv4();

  constructor(public task: string) {}

  markCompleted() {
    this.completed = true;
    this.active = false;
  }
}
