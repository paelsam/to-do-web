import { Todo } from "../classes";
import { todoList } from "../index";


// Referencia en el HTML
const anchorFilters     = document.querySelectorAll('.filtro');
const ulFilters         = document.querySelector('.filters');
const divTodoList       = document.querySelector('.todo-list');
const textoInput        = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');



export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button type="button" class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}



// Eventos

textoInput.addEventListener('keyup', ( evento ) => {

    
    if ( evento.keyCode === 13 && textoInput.value.length > 0 ) {


        const nuevoTodo = new Todo( textoInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHTML( nuevoTodo );

        textoInput.value = '';
    }
})


divTodoList.addEventListener('click', (evento) => {

    const nombreElemento    = evento.target.localName; // input, label, button
    const todoElemento      = evento.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');


    // console.log( todoElemento );

    if ( nombreElemento.includes('input') ) {

        todoList.cambiarACompletado(Number(todoId));
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {

        todoList.eliminarTodo( Number(todoId) );
        divTodoList.removeChild( todoElemento );

    }
    // console.log( nombreElemento );
})


borrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length - 1; i >= 0; i-- ) {
        
        const elemento = divTodoList.children[i];

        if ( elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }
    }
})



ulFilters.addEventListener('click', evento => {
    const filtro = evento.target.text;
    if ( !filtro ){ return };

    console.log( anchorFilters );
    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    evento.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        
        const elementoCompletado = elemento.classList.contains('completed');
        elemento.classList.remove('hidden');

        switch( filtro ) {
            case 'Pendientes':
                if ( elementoCompletado ) {
                    elemento.classList.add('hidden'); 
                }
            break;

            case 'Completados': 
                if ( !elementoCompletado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }

    }

})