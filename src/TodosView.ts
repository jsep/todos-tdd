import {Todos} from './Todos';
import {EventEmitter} from 'events';

export class TodosView {
  listContainer = document.createElement('div');
  listView: TodosListView;
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
    this.formView.on('submit', todo => {
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
  private eventEmitter = new EventEmitter();

  constructor() {
    this.init();
  }

  private init() {
    this.setupButton();
    this.appendElements();
    this.addEvents();
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

  on(name: 'submit', handler: OnSubmitHandler) {
    this.eventEmitter.on('submit', handler);
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
    this.form.onsubmit = this.emitOnSubmit();
    this.button.onclick = this.emitOnSubmit();
  }

  private emitOnSubmit() {
    return (event: Event) => {
      event.preventDefault();
      if (!this.value) return;
      this.eventEmitter.emit('submit', this.value);
      this.input.value = '';
    };
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
    todoItem.on('remove', this.removeTodo);
    todoItem.on('edit', this.updateTodo);
    this.todosViewItems.push(todoItem);
  };

  private removeTodo = (todoItemView: TodoItemView) => {
    this.todos.remove(todoItemView.todo);
    todoItemView.destroy();
  };

  private updateTodo = (newTodo: string, todoItem: TodoItemView) => {
    this.todos.edit(todoItem.todo, newTodo);
  };

  addTodo(todo: string) {
    this.todos.add(todo);
    this.renderTodo(todo);
  }
}

type OnRemoveHandler = (item: TodoItemView) => void;
type OnEditHandler = (value: string, item: TodoItemView) => void;

export class TodoItemView {
  item = document.createElement('li');
  removeButton = document.createElement('button');
  text = document.createElement('span');
  input = document.createElement('input');
  form = document.createElement('form');
  eventEmitter = new EventEmitter();

  constructor(public todo: string) {
    this.init();
  }

  get testId() {
    return this.todo + 'remove';
  }

  destroy() {
    this.item.remove();
  }

  on(name: 'remove', handler: OnRemoveHandler): OnRemoveHandler;
  on(name: 'edit', handler: OnEditHandler): OnEditHandler {
    this.eventEmitter.on(name, handler);
    return handler;
  }

  render(host: HTMLElement) {
    this.item.appendChild(this.text);
    this.item.appendChild(this.removeButton);
    host.appendChild(this.item);
  }

  private init() {
    this.setupText();
    this.setupRemoveBtn();
    this.setupForm();
  }

  private setupRemoveBtn() {
    this.removeButton.innerHTML = 'x';
    this.removeButton.setAttribute('data-testid', this.testId);
    this.removeButton.innerHTML = 'x';
    this.removeButton.onclick = this.emitOnRemove;
  }

  private emitOnRemove = (e: Event) => {
    e.preventDefault();
    this.eventEmitter.emit('remove', this);
  };

  private setupText() {
    this.text.innerHTML = this.todo;
  }

  private setupForm() {
    this.input.value = this.todo;
    this.form.appendChild(this.input);
    this.item.ondblclick = this.editTodoWithForm;
    this.text.ondblclick = this.editTodoWithForm;
    this.form.onsubmit = this.emitOnEditAndUpdateUI;
  }

  private emitOnEditAndUpdateUI = (e: Event) => {
    this.emitOnEdit(e);
    this.updateTextElement();
    this.restoreControls();
  };

  private restoreControls() {
    this.item.removeChild(this.form);
    this.item.appendChild(this.text);
    this.item.appendChild(this.removeButton);
  }

  private updateTextElement() {
    this.text.innerHTML = this.input.value;
  }

  private emitOnEdit(e: Event) {
    e.preventDefault();
    this.eventEmitter.emit('edit', this.input.value, this);
  }

  private editTodoWithForm = () => {
    this.item.removeChild(this.text);
    this.item.removeChild(this.removeButton);
    this.item.appendChild(this.form);
  };
}
