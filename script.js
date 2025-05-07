// I used db.json to give me a fake API URL to fetch 10 sample to-do items that ive hosted in a local JSON server.(db.json file)
const APLUrl = 'http://localhost:3000/todos?_limit=10'

let todos = []; // Array to hold todo items


window.onload = async () => {
  // I want to learn how to store my information on my mock API. ive currently stored it on my local storage. which is there as long as my brower exists. I think it would also be fun to try to put them on both databases. That would be fun to learn how to do.
  const saved = localStorage.getItem('todos'); 

  if (saved) {
    todos = JSON.parse(saved);
  } else {

    const response = await fetch(APLUrl);
    todos = await response.json();
    saveToLocalStorage(); //Ensure that the page dynamically updates in response to user actions

    
  }
  renderTodos(); 
};

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}89


function renderTodos(filter = 'all') {
  const list = document.getElementById('todoList');
  list.innerHTML = ''; 

  let filteredTodos = todos; // Shows everything on the list

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (filter === 'notCompleted') {
    filteredTodos = todos.filter(todo => !todo.completed); 
  }


  filteredTodos.forEach(todo => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>
        <!-- Checkbox to toggle completed status -->
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})" />


        <!-- Task title, crossed out if completed -->
        <span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.title}</span>
      </div>

      <!-- Button to delete the todo -->
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    list.appendChild(li); 
  });
}


// User can add thier own task to the list
function addTodo() {
  const input = document.getElementById('newTodo');
  const title = input.value.trim(); 
  
   // Create a new the to do
  if (title === '') return; 
  const newTodo = {
    userId: 1,
    id: Date.now(), 
    title,
    completed: false
  };

  
  todos.unshift(newTodo);
  input.value = ''; 
  saveToLocalStorage(); 
  renderTodos(); 
}




function toggleComplete(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveToLocalStorage(); 
  renderTodos(); 
}


//The function delets a task from the list
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id); 
  saveToLocalStorage(); 
  renderTodos(); 
}


 //Allow the user to filter tasks by "Completed" or "Not Completed" and also "All"
function filterTodos(type) {
  renderTodos(type); 
}
