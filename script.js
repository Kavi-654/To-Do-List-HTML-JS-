/* ======================= VARIABLES ======================= */
const inputField = document.getElementById("inputext");
const taskAssign = document.getElementById("tasklist");
const addButton = document.getElementById("buttons");

const allBtn = document.getElementById("all");
const penBtn = document.getElementById("pending");
const compBtn = document.getElementById("completed");

/* ======================= SAVE TASKS ======================= */
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#tasklist li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("input[type='checkbox']").checked;

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ======================= LOAD TASKS ======================= */
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => addTask(task.text, task.completed));
}

/* ======================= ADD TASK ======================= */
function addTask(text = null, completed = false) {
    const userInput = text ?? inputField.value;

    if (userInput.trim() === "") {
        alert("Add a valid task!!");
        return;
    }

    // Create task element
    const newTask = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = userInput;
    if (completed) taskText.classList.add("completed");

    // Checkbox change -> mark completed
    checkbox.addEventListener("change", () => {
        taskText.classList.toggle("completed");
        saveTasks();
    });

    // Edit task on double click
    taskText.addEventListener("dblclick", () => {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;

        newTask.replaceChild(editInput, taskText);
        editInput.focus();

        function saveEdit() {
            if (editInput.value.trim() !== "") {
                taskText.textContent = editInput.value;
            }
            newTask.replaceChild(taskText, editInput);
            saveTasks();
        }

        editInput.addEventListener("blur", saveEdit);
        editInput.addEventListener("keypress", e => {
            if (e.key === "Enter") saveEdit();
        });
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        newTask.remove();
        saveTasks();
    });

    // Append elements to li
    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);

    // Add task to list
    taskAssign.appendChild(newTask);

    // Clear input
    inputField.value = "";

    saveTasks();
}

/* ======================= FILTER TASKS ======================= */
allBtn.addEventListener("click", () => {
    document.querySelectorAll("#tasklist li").forEach(task => {
        task.style.display = "flex";
    });
});

compBtn.addEventListener("click", () => {
    document.querySelectorAll("#tasklist li").forEach(task => {
        const checkbox = task.querySelector("input[type='checkbox']");
        task.style.display = checkbox.checked ? "flex" : "none";
    });
});

penBtn.addEventListener("click", () => {
    document.querySelectorAll("#tasklist li").forEach(task => {
        const checkbox = task.querySelector("input[type='checkbox']");
        task.style.display = checkbox.checked ? "none" : "flex";
    });
});

/* ======================= EVENT LISTENERS ======================= */
addButton.addEventListener("click", () => addTask());

inputField.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

/* ======================= INIT ======================= */
loadTasks();
