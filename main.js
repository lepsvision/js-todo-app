const TaskComponent = (value) => {
    return (`
      <div class="task" attr-value="${value}">
        <div class="content">
            <input type="text" class="text" value="${value}" readonly>
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
      </div>
    `)
};


window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const tasksList = document.querySelector("#tasks");

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const updateTodosStorage = () => localStorage.setItem('todos', JSON.stringify(todos));

    tasksList.innerHTML = todos.map(TaskComponent).join('');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value.trim();

        if (value && !todos.includes(value)) {
            todos.push(value);
            updateTodosStorage();
            tasksList.innerHTML += TaskComponent(value);
        }

        input.value = "";
    });

    tasksList.addEventListener('click', (e) => {
        const element = e.target;
        const selectedTask = element.closest('.task');
        const inputElement = selectedTask.querySelector('.text');

        const selectedTaskValue = selectedTask.getAttribute('attr-value');
        const selectedTaskIndex = todos.findIndex(value => value === selectedTaskValue);

        const isEditButton = element.classList.contains('edit');
        const isDeleteButton = element.classList.contains('delete');

        if (isEditButton) {
            if (inputElement.readOnly) {
                inputElement.readOnly = false;
                inputElement.focus();
                element.innerText = "Save";
            } else {
                todos[selectedTaskIndex] = inputElement.value;
                updateTodosStorage();
                inputElement.readOnly = true;
                element.innerText = "Edit";
            }
        } else if (isDeleteButton) {
            todos.splice(selectedTaskIndex, 1);
            updateTodosStorage();
            tasksList.removeChild(selectedTask);
        }
    });
})