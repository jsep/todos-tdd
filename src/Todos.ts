export class Todos {
  all: string[] = [];
  completed: string[] = [];
  active: string[] = [];

  add(todo: string) {
    this.all.push(todo);
    this.active.push(todo);
  }

  remove(todoToRemove: string) {
    this.all = this._filterTodo(this.all, todoToRemove);
    this.completed = this._filterTodo(this.completed, todoToRemove);
    this.active = this._filterTodo(this.active, todoToRemove);
  }

  complete(todo: string) {
    this.completed.push(todo);
    this.active = this._filterTodo(this.active, todo);
  }

  private _filterTodo(list: string[], todo: string) {
    return list.filter(t => t !== todo);
  }
}
