"use strict";
const btnSubmit = document.querySelector('.todo-btn');
const inputTodo = document.querySelector('.todo-input');
const formTodo = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const btnDeleteAll = document.querySelector('.todo-btn-delete-all');
// Envio de nova tarefa
const handleSubmit = (e) => {
    e.preventDefault();
    // cria uma nova tarefa
    const newTodo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };
    // Salvar a tarefa num armazenamento local
    todos.push(newTodo);
    // Função de Salvar
    saveTodos();
    // Função de append new Todo
    appendTodo(newTodo);
    //Reset input
    inputTodo.value = "";
};
//Save Tarefa
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
//Array de novas tarefas
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
//Append de novas tarefas ao DOM no inicio do programa
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});
// Append function
const appendTodo = (newTodo) => {
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed;
    // Adicionar eventlistener no checkbox
    checkB.addEventListener('change', () => {
        console.log('Checked');
        newTodo.completed = checkB.checked;
        //Save tarefas no storage quando atualiza a pagina
        saveTodos();
    });
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
};
// Form eventlistener
formTodo.addEventListener('submit', e => handleSubmit(e));
//Delete All
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};
