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

beforeEach(() => {
  host = document.createElement('div');
  addTodos();
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
  expect(todosView.listContainer).toHaveTextContent(todo1);
  expect(todosView.listContainer).toHaveTextContent(todo2);
});

test('add a new todo', () => {
  const newTodo = 'New todo';
  todosView.addTodo(newTodo);
  expect(todosView.listContainer).toHaveTextContent(newTodo);
});

test('add a new todo on submit', () => {
  const newTodo = 'New todo 2';
  todosView.formView.input.value = newTodo;
  fireEvent.submit(todosView.form, {});
  expect(todosView.listContainer).toHaveTextContent(newTodo);
});

function addTodos() {
  todos = new Todos();
  todo1 = 'First task';
  todo2 = 'Second item';
  todos.add(todo1);
  todos.add(todo2);
}
