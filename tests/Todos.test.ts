import {Todos} from '../src/Todos';

let todos: Todos;
let todo2: string;

let todo1: string;
beforeEach(() => {
  todos = new Todos();
  todo1 = 'Todo 1';
  todo2 = 'Todo 2';
});

test('add todo', () => {
  addTodo(todo1);

  lengthOf(todos.all).is(1);
  expect(todos.all).toContain(todo1);
});

test('remove todo', () => {
  addTodo(todo1);
  removeTodo(todo1);

  isEmpty(todos.all);
});

test('removes from completed', () => {
  addTodo(todo1);
  addTodo(todo2);
  completeTodo(todo2);
  removeTodo(todo2);

  lengthOf(todos.completed).is(0);
  expect(todos.all).not.toContain(todo2);
});

test('removes from active todos', () => {
  addTodo(todo1);
  addTodo(todo2);
  removeTodo(todo2);

  lengthOf(todos.all).is(1);
  lengthOf(todos.active).is(1);
  expect(todos.active).not.toContain(todo2);
});

test('mark todo completed', () => {
  addTodo(todo1);
  addTodo(todo2);
  completeTodo(todo1);

  lengthOf(todos.all).is(2);
  lengthOf(todos.completed).is(1);
  expect(todos.completed).toContain(todo1);
});

test('active add todos', () => {
  addTodo(todo1);
  addTodo(todo2);

  lengthOf(todos.all).is(2);
  lengthOf(todos.active).is(2);
  expect(todos.active).toContain(todo1);
  expect(todos.active).toContain(todo2);
});

test('active filter completed todos', () => {
  addTodo(todo1);
  addTodo(todo2);
  completeTodo(todo2);

  lengthOf(todos.all).is(2);
  lengthOf(todos.active).is(1);
  expect(todos.active).toContain(todo1);
});

const addTodo = (todo: string) => {
  todos.add(todo);
};

function removeTodo(todo: string) {
  todos.remove(todo);
}

function completeTodo(todo: string) {
  todos.complete(todo);
}

function lengthOf(list: Readonly<Array<string>>) {
  return {
    is(length: number) {
      expect(list).toHaveLength(length);
    },
  };
}

function isEmpty(list: any[]) {
  expect(list).toHaveLength(0);
}
