const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLLIElement;
const btnDeleteAll = document.querySelector('.todo-btn-delete-all') as HTMLButtonElement;


// Função pra lidar com envio do form. 
const handleSubmit = (e: Event)  => {
    e.preventDefault();
    // Cria um novo objeto Todo.
    const newTodo: Todo = {
        id: Date.now(),
        todo:  inputTodo.value,
        completed: false
    };

    // Adiciona a tarefa ao array.
    todos.push(newTodo);
    // Salvamento no storage local.
    saveTodos();
    // Função para adicionar a tarefa à página.
    appendTodo(newTodo);
    

    //Reset input
    inputTodo.value = "";
};

//Função responsável por salvar as tarefas diretamente no storage local.
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Interface de nova Tarefa
interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

//Array de novas tarefas usando a interface Todo.
const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);

//Aguarda o evento do DOMContentLoaded. Quando ocorre, ele itera sobre o array todos e usa a função appendTodo pra adicionar as tarefas  à lista da interface do usuario.
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});

// Função responsável por criar os elementos HTML reprensentando cada tarefa na lista de tarefas.
const appendTodo = (newTodo: Todo) => {
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed;
    // Ouvidor pra alterar o status da tarefa quando marca/desmarca
    checkB.addEventListener('change', ()=>{
        console.log('Checked');
        newTodo.completed = checkB.checked;
        
        saveTodos(); //Salva a tarefa no storage Local.
    });
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
}

// Chama a função handleSubmit quando o formulário é enviado.
formTodo.addEventListener('submit', e => handleSubmit(e));


//Definida para apagar todas as tarefas. Define o array como vazio, chama a função saveTodos pra atualizar o armazenamento local e limpa o conteudo da todoList.
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};


