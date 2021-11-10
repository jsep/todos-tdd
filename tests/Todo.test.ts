import {Todo} from '../src/Todo';

test('Create todo item', () => {
  const taskToDo = 'Task to do';
  const todo = new Todo(taskToDo);
  expect(todo.id).not.toBeUndefined();
  expect(todo.task).toEqual(taskToDo);
  expect(todo.active).toBeTruthy();
  expect(todo.completed).toBeFalsy();
});

test('Mark todo item as completed', () => {
  const todo = new Todo('Test');
  todo.markCompleted();
  expect(todo.completed).toBeTruthy();
  expect(todo.active).toBeFalsy();
});
