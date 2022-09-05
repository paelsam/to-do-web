// Styles:
import './css/styles.css';

// Classes :
import { crearTodoHTML, Todo, TodoList } from './classes'


// TodoList Object:
export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHTML );

