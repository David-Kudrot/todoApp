let deleteTaskId = null; // Global variable to store the ID of the task to be deleted

// Function to fetch tasks from the API
function fetchTasks() {
    fetch('https://todo-app-backend-08b7.onrender.com/api/todos/')
    .then(response => response.json())
    .then(data => {
        const tasksDiv = document.getElementById('tasks');
        tasksDiv.innerHTML = ''; // Clear existing tasks
        data.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            const taskDate = new Date(task.created_at); // Convert date string to Date object
            const formattedDate = `${taskDate.toLocaleDateString()} ${taskDate.toLocaleTimeString()}`;
            taskDiv.innerHTML = `
                <div class="content">
                    <input type="text" value="${task.title}" readonly>
                </div>
                <div class="actions">
                    <button class="Edit" data-id="${task.id}">Edit</button>
                    <button class="Delete" data-id="${task.id}">Delete</button>
                    <small class="date text-muted">Created: ${formattedDate}</small>
                `;
            tasksDiv.appendChild(taskDiv);

            // Add event listeners for edit and delete buttons
            const editButton = taskDiv.querySelector('.Edit');
            const deleteButton = taskDiv.querySelector('.Delete');
            editButton.addEventListener('click', () => openEditModal(task.id, task));
            deleteButton.addEventListener('click', () => openDeleteModal(task.id));
        });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Function to open the edit modal with the selected task's details
function openEditModal(id, task) {
    const title = document.getElementById("title");
    title.innerHTML = task.title;
    const modalTaskInput = document.getElementById('modal-task-input');
    modalTaskInput.value = task.body;
    document.getElementById('edit-task-id').value = id;
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Function to save the edited task
document.getElementById('save-modal-task').addEventListener('click', () => {
    const editedTaskId = document.getElementById('edit-task-id').value;
    const editedTitle = document.getElementById('title').innerHTML; // Get edited title
    const editedBody = document.getElementById('modal-task-input').value; // Get edited body

    fetch(`https://todo-app-backend-08b7.onrender.com/api/todos/${editedTaskId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: editedTitle,
            body: editedBody
        }) // Send both title and body as data
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); // Refresh task list after editing
            const editModal = document.getElementById('editModal');
            editModal.classList.remove('show'); // Hide the modal
            document.body.classList.remove('modal-open'); // Remove the modal-open class from body
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) modalBackdrop.remove();
        } else {
            throw new Error('Failed to edit task');
        }
    })
    .catch(error => console.error('Error editing task:', error));
});

// Function to open the delete confirmation modal
function openDeleteModal(id) {
    deleteTaskId = id; // Store the id of the task to be deleted
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

// Function to delete a task
document.getElementById('confirm-delete').addEventListener('click', () => {
    if (deleteTaskId) {
        fetch(`https://todo-app-backend-08b7.onrender.com/api/todos/${deleteTaskId}/`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchTasks(); // Refresh task list after deleting
                const deleteModal = document.getElementById('deleteModal');
                deleteModal.classList.remove('show'); // Hide the modal
                document.body.classList.remove('modal-open'); // Remove the modal-open class from body
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) modalBackdrop.remove();
                deleteTaskId = null; // Reset the deleteTaskId
            } else {
                throw new Error('Failed to delete task');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    }
});

// Fetch tasks when the page loads
fetchTasks();

// Create task
document.getElementById('create-task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('create-task-title').value;
    const body = document.getElementById('create-task-body').value;

    fetch('https://todo-app-backend-08b7.onrender.com/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to create task');
        }
    })
    .then(data => {
        console.log('Task created successfully:', data);
        // Clear the form fields
        document.getElementById('create-task-form').reset();
        // Refresh the task list
        fetchTasks();
    })
    .catch(error => {
        console.error('Error creating task:', error);
    });
});
