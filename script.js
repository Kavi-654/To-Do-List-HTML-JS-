const inputField=document.getElementById("inputext");
const taskAssign=document.getElementById("tasklist");
const addButton=document.getElementById("buttons");
function addTask() {
    let userInput = inputField.value;
    
    if(userInput.trim() === "") {
        alert("Add a valid task!!");
        return;
    }
    
    // Create li
    let newTask = document.createElement('li');
    
    // Create and add checkbox FIRST
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newTask.appendChild(checkbox);
    
    // Create and add text AFTER checkbox
    let taskText = document.createElement('span');
    taskText.textContent = userInput;
    newTask.appendChild(taskText);
    
    // Add the complete li to the list
    taskAssign.appendChild(newTask);
    // Create delete button
let deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';

// Add click event to remove the task
deleteBtn.addEventListener('click', function() {
    newTask.remove();  // This removes the <li> from the page
});

// Add button to the li
newTask.appendChild(deleteBtn);
}
addButton.addEventListener('click',addTask);