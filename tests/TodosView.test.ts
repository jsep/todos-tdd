/**
 * @jest-environment jsdom
 */
import {TodosForm, TodosView} from '../src/TodosView';
import {Todos} from '../src/Todos';
import {fireEvent} from '@testing-library/react';

let host: HTMLDivElement;
let todosView: TodosView;
let todos: Todos;
let todo2: string;
let todo1: string;
let newTodo: string;

beforeEach(() => {
  host = document.createElement('div');
  addTodos();
  newTodo = 'New todo';
  todosView = new TodosView(todos);
  todosView.render(host);
});

test('render todos form', () => {
  const todosForm = new TodosForm();
  todosForm.render(host);

  expect(todosForm.form).toContainElement(todosForm.input);
  expect(todosForm.form).toContainElement(todosForm.button);
  expect(host).toContainElement(todosForm.form);
});

test('render todos view', () => {
  expect(host).toContainElement(todosView.listContainer);
  expect(host).toContainElement(todosView.form);
  expect(todosView.form).toContainElement(todosView.formView.input);
  expect(todosView.form).toContainElement(todosView.formView.button);
  expect(host).toContainElement(todosView.form);
});

test('render todos list', () => {
  hasTodo(todo1);
  hasTodo(todo2);
});
test('add a new todo', () => {
  todosView.addTodo(newTodo);
  hasTodo(newTodo);
});

test('add a new todo on submit', () => {
  setFormValue(newTodo);

  submitForm();

  hasTodo(newTodo);
  formValueIsEmpty();
});

test('add a new todo on click add', () => {
  setFormValue(newTodo);

  clickAddButton();

  hasTodo(newTodo);
  formValueIsEmpty();
});

const addTodos = () => {
  todos = new Todos();
  todo1 = 'First task';
  todo2 = 'Second item';
  todos.add(todo1);
  todos.add(todo2);
};

const hasTodo = (todo: string) => {
  expect(todosView.listContainer).toHaveTextContent(todo);
};

const formValueIsEmpty = () => {
  expect(todosView.formView.value).toEqual('');
};

const setFormValue = (newTodo: string) => {
  todosView.formView.value = newTodo;
};

const submitForm = () => {
  fireEvent.submit(todosView.form);
};

function clickAddButton() {
  fireEvent.click(todosView.formView.button);
}
