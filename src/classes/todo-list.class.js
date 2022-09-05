import { Todo } from "./todo.class";


export class TodoList {
    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
        return this.todos;
    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id !== id);
        // Guardando en el localStorage
        this.guardarLocalStorage();

        /** 
         * this.todos = this.todos.filter( (todo, index) => {
         *       if ( todo.id === id ) {
         *           this.todos.slice(index, 1);
         *       }
         *   })
         **/

        /**
         * for ( const todo of this.todos ) {
         *       const todoAEliminar = this.todos.indexOf( todo.id );
         *        if ( todoAEliminar !==  -1) {
         *              this.todos.slice(todoAEliminar, 1);
         *               break; 
         *         }
         *   }
         **/

    }

    cambiarACompletado(id) {
        for (const todo of this.todos) {
            // console.log( todo.id, id )
            if (todo.id === id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    //! LocalStorage Methods
    guardarLocalStorage() {

        localStorage.setItem('todos', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todos'))
            ? JSON.parse(localStorage.getItem('todos'))
            : [];

        /** 
         * Si solo vamos a poner un argumento y lo vamos a pasar a una funcion
         * Solo ponermos la funcion (sin los parentesis)
         * 
         * Por ejemplo: 
         * 
         * Esto:
         *      this.todos.map( (todo) => Todo.fromJSON(todo) );
         * Es igual a esto: 
         *      this.todos.map( Todo.fromJSON );
         * 
         * 
         * **/
        // 
        this.todos = this.todos.map(Todo.fromJSON);
    }
}