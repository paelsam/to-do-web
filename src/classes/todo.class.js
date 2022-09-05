

export class Todo {

    // Creando una instancia de mi clase con un objeto.
    static fromJSON( { id, tarea, completado, horaCreacion } ) {
        const tempTodo = new Todo( tarea );
        tempTodo.id           = id;
        tempTodo.horaCreacion = horaCreacion;
        tempTodo.completado   = completado;

        return tempTodo;
    }

    constructor( tarea ) {
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.horaCreacion = new Date();
    }

    printClass() {
        console.log(`${this.id}: ${this.tarea}`);
    }

}