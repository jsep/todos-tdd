import {Todos} from './Todos';

export class TodosView {
  listContainer = document.createElement('div');
  listView: TodosListView;
  list = document.createElement('ul');
  formView = new TodosForm();

  constructor(private todos: Todos) {
    this.listView = new TodosListView(todos);
  }

  get form() {
    return this.formView.form;
  }

  render(host: HTMLElement) {
    this.renderForm(host);
    this.renderTodosList(host);
  }

  private renderForm(host: HTMLElement) {
    this.formView.render(host);
    this.formView.onSubmit(todo => {
      this.addTodo(todo);
    });
  }

  private renderTodosList(host: HTMLElement) {
    this.listView.render(this.listContainer);
    host.appendChild(this.listContainer);
  }

  addTodo(todo: string) {
    this.listView.addTodo(todo);
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
    this.form.onsubmit = this.fireOnSubmitHandlers();
    this.button.onclick = this.fireOnSubmitHandlers();
  }

  private fireOnSubmitHandlers() {
    return (event: Event) => {
      event.preventDefault();
      if (!this.value) return;
      this.onSubmitHandlers.forEach(handler => {
        handler(this.value);
      });
      this.input.value = '';
    };
  }

  render(host: HTMLElement) {
    host.appendChild(this.form);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  onSubmit(handler: OnSubmitHandler) {
    this.onSubmitHandlers.push(handler);
  }
}

export class TodosListView {
  list = document.createElement('ul');
  todosViewItems: TodoItemView[] = [];

  constructor(private todos: Todos) {}

  render(host: HTMLElement) {
    this.todos.all.forEach(this.renderTodo);
    host.appendChild(this.list);
  }

  renderTodo = (todo: string) => {
    const todoItem = new TodoItemView(todo);
    todoItem.render(this.list);
    todoItem.onRemove(item => {
      this.todos.remove(todo);
      item.item.remove();
    });
    this.todosViewItems.push(todoItem);
  };

  addTodo(todo: string) {
    this.todos.add(todo);
    this.renderTodo(todo);
  }
}

type OnRemoveHandler = (item: TodoItemView) => void;

export class TodoItemView {
  item = document.createElement('li');
  removeButton = document.createElement('button');
  text = document.createElement('span');
  private onRemoveHandlers: OnRemoveHandler[] = [];

  constructor(private todo: string) {
    this.init();
  }

  get testId() {
    return this.todo + 'remove';
  }

  onRemove(handler: OnRemoveHandler) {
    this.onRemoveHandlers.push(handler);
  }

  render(host: HTMLElement) {
    this.item.appendChild(this.text);
    this.item.appendChild(this.removeButton);
    host.appendChild(this.item);
  }

  private init() {
    this.setupText();
    this.setupRemoveBtn();
  }

  private setupRemoveBtn() {
    this.removeButton.innerHTML = 'x';
    this.removeButton.setAttribute('data-testid', this.testId);
    this.removeButton.innerHTML = 'x';
    this.removeButton.onclick = (e: Event) => {
      e.preventDefault();
      this.onRemoveHandlers.forEach(handler => {
        handler(this);
      });
    };
  }

  private setupText() {
    this.text.innerHTML = this.todo;
  }
}
