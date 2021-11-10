import {Todo} from './Todo';

export class Todos {
  all: Todo[] = [];
  completed: Todo[] = [];
  active: Todo[] = [];

  add(todo: Todo) {
    this.all.push(todo);
    this.active.push(todo);
  }

  remove(todoToRemove: Todo) {
    this.all = this._filterTodo(this.all, todoToRemove);
    this.completed = this._filterTodo(this.completed, todoToRemove);
    this.active = this._filterTodo(this.active, todoToRemove);
  }

  complete(todo: Todo) {
    todo.markCompleted();
    this.completed.push(todo);
    this.active = this._filterTodo(this.active, todo);
  }

  private _filterTodo(list: Todo[], todo: Todo) {
    return list.filter(t => t !== todo);
  }

  edit(todo: Todo, editedTask: string) {
    todo.task = editedTask;
  }
}
