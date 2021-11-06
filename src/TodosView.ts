import {Todos} from './Todos';

export class TodosView {
  listContainer = document.createElement('div');
  list = document.createElement('ul');
  formView = new TodosForm();

  constructor(private todos: Todos) {}

  render(host: HTMLElement) {
    this.renderForm(host);
    this.renderTodosList(host);
  }

  get form() {
    return this.formView.form;
  }

  private renderForm(host: HTMLElement) {
    this.formView.render(host);
    this.formView.onSubmit(todo => {
      this.addTodo(todo);
    });
  }

  private renderTodosList(host: HTMLElement) {
    this.todos.all.forEach(this.appendTodo);
    this.listContainer.appendChild(this.list);
    host.appendChild(this.listContainer);
  }

  appendTodo = (todo: string) => {
    this.list.appendChild(this.renderTodo(todo));
  };

  private renderTodo(todo: string) {
    const item = document.createElement('li');
    item.innerHTML = todo;
    return item;
  }

  addTodo(newTodo: string) {
    this.todos.add(newTodo);
    this.appendTodo(newTodo);
  }
}

type OnSubmitHandler = (todo: string) => void;

export class TodosForm {
  input = document.createElement('input');
  button = document.createElement('input');
  form = document.createElement('form');
  onSubmitHandlers: OnSubmitHandler[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.setupButton();
    this.appendElements();
    this.addEvents();
  }

  private setupButton() {
    this.button.type = 'submit';
    this.button.value = 'Add';
  }

  private appendElements() {
    this.form.appendChild(this.input);
    this.form.appendChild(this.button);
  }

  private addEvents() {
    this.form.onsubmit = (event: Event) => {
      event.preventDefault();
      if (!this.value) return;
      this.onSubmitHandlers.forEach(handler => {
        handler(this.value);
      });
    };
  }

  render(host: HTMLElement) {
    host.appendChild(this.form);
  }

  get value() {
    return this.input.value;
  }

  onSubmit(handler: OnSubmitHandler) {
    this.onSubmitHandlers.push(handler);
  }
}
