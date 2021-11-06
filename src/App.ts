import {Todos} from './Todos';
import {TodosView} from './TodosView';

export function app() {
  const todos = new Todos();
  todos.add('Test 1');
  todos.add('Test 2');
  const todosView = new TodosView(todos);
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = '';
    todosView.render(appContainer);
  }
}

app();
