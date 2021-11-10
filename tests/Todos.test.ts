import {Todos} from '../src/Todos';
import {Todo} from '../src/Todo';

let todos: Todos;
let todo1: Todo;
let todo2: Todo;

beforeEach(() => {
  todos = new Todos();
  todo1 = new Todo('Todo 1');
  todo2 = new Todo('Todo 2');
});

test('add todo', () => {
  addTodo(todo1);

  lengthOf(todos.all).is(1);
  expect(todos.all).toContain(todo1);
});

test('edit todo', () => {
  addTodo(todo1);
  const editedTask = 'Edited todo';

  editTodo(todo1, editedTask);

  expect(todos.all).toContain(todo1);
  expect(todos.active).toContain(todo1);
  expect(todo1.task).toEqual(editedTask);
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
  expect(todo1.completed).toBeTruthy();
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

const addTodo = (todo: Todo) => {
  todos.add(todo);
};

function removeTodo(todo: Todo) {
  todos.remove(todo);
}

function completeTodo(todo: Todo) {
  todos.complete(todo);
}

function lengthOf(list: Readonly<Array<Todo>>) {
  return {
    is(length: number) {
      expect(list).toHaveLength(length);
    },
  };
}

function isEmpty(list: Todo[]) {
  expect(list).toHaveLength(0);
}

function editTodo(todo1: Todo, editedTodo: string) {
  todos.edit(todo1, editedTodo);
}
