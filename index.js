// Initialize projects with initial tasks
let projects = {
    'Chores': [
        {
            title: "Wash clothes",
            description: "Do laundry, including sorting, washing, drying, and folding.",
            dueDate: "2024-07-30", 
            priority: "Medium",
            project: "Chores"
        }
    ],
    'Shopping': [
        {
            title: "Grocery shopping",
            description: "Buy fruits, vegetables, and other essentials.",
            dueDate: "2024-07-28",
            priority: "High",
            project: "Shopping"
        }
    ],
    'Default': []
};

// DOM elements
const homeDiv = document.querySelector('.home');
const addtaskDiv = document.querySelector('.addtask');
const projectsDiv = document.querySelector('.projects');
const header = document.getElementsByClassName('header')[0];

// Function to update the header and call the corresponding menu function
function nameheader(name) {
    homeDiv.innerHTML = '';
    addtaskDiv.innerHTML = '';
    projectsDiv.innerHTML = '';
    header.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.id = "headertitle";
    h1.textContent = name;
    header.appendChild(h1);
    checkHeaderContent(name);
}
// to start on the homepage when entering website
nameheader("Home");

// Event listeners for side menu
const homeside = document.getElementById('homeclick');
homeside.addEventListener("click", () => nameheader("Home"));

const addtaskside = document.getElementById('addtaskclick');
addtaskside.addEventListener("click", () => nameheader("Add Task"));

const projectside = document.getElementById('projectclick');
projectside.addEventListener("click", () => nameheader("Projects"));

// Function to check header content and call the corresponding menu function
function checkHeaderContent(content) {
    if (content === "Add Task") {
        addtaskMenu();
    } else if (content === "Home") {
        homeMenu();
    } else if (content === "Projects") {
        projectsMenu();
    }
}

// HOME MENU
function homeMenu() {
    homeDisplay();
}

// Function to get the current date
function getCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
}

// Function to display the home menu
function homeDisplay(){
    addtaskDiv.style.display = 'none';
    projectsDiv.style.display = 'none';
    homeDiv.style.display = 'grid';
    homeDiv.innerHTML = '';

    const hometitle = document.createElement("div");
    hometitle.className = "hometitle";
    homeDiv.appendChild(hometitle);

    const homeboxes = document.createElement("div");
    homeboxes.className = "homeboxes";
    homeDiv.appendChild(homeboxes);

    const h1 = document.createElement('h1')
    h1.textContent = "Today";
    hometitle.appendChild(h1);

    const h3 = document.createElement('h3')
    h3.textContent = getCurrentDate();
    hometitle.appendChild(h3);

    displayTasks();
}

// Function to create a task box
function createTaskBox(task, projectName, index) {
    // styling the homeboxes container
    const homeboxes = document.querySelector('.homeboxes');
    homeboxes.style.display = 'grid';
    homeboxes.style.gridTemplateColumns = 'repeat(4, 1fr)';
    homeboxes.style.gap = '20px';
    homeboxes.style.padding = '20px';
    homeboxes.style.maxHeight = '40vh';
    homeboxes.style.overflowY = 'auto';

    // styling taskboxes

    const taskBox = document.createElement('div');
    taskBox.className = 'homebox';
    taskBox.style.backgroundColor = 'aliceblue';
    taskBox.style.padding = '20px';
    taskBox.style.borderRadius = '15px';
    taskBox.style.position = 'relative';

    // adding input into taskbox

    taskBox.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <p>Due: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <p>Project: ${task.project}</p>
    `;

    // adding delete button

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.position = 'absolute';
    deleteButton.style.bottom = '10px';
    deleteButton.style.right = '10px';

    deleteButton.addEventListener('click', () => deleteTask(projectName, index));
    taskBox.appendChild(deleteButton);

    return taskBox;
}

// Function to delete a task
function deleteTask(projectName, index) {
    projects[projectName].splice(index, 1);
    displayTasks();
}

// Function to display all tasks
function displayTasks() {
    const homeboxes = document.querySelector('.homeboxes');
    homeboxes.innerHTML = '';

    for (let projectName in projects) {
        projects[projectName].forEach((task, index) => {
            const taskBox = createTaskBox(task, projectName, index);
            homeboxes.appendChild(taskBox);
        });
    }
}

// ADD TASK MENU
function addtaskMenu() {
    addtaskDisplay();
}

function addtaskDisplay() {
    homeDiv.style.display = 'none';
    projectsDiv.style.display = 'none';
    addtaskDiv.style.display = 'flex';
    addtaskDiv.innerHTML = '';

    // creating form

    const form = document.createElement('form');
    form.className = 'task-form';

    // adding title input

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.required = true;

    // adding description input

    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description:';
    const descInput = document.createElement('textarea');
    descInput.required = true;

    // adding date input

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Due Date:';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.required = true;

    // adding project input

    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Project:';
    const projectSelect = document.createElement('select');
    for (let project in projects) {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        projectSelect.appendChild(option);
    }

    // adding priority input

    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority:';
    const prioritySelect = document.createElement('select');
    const lowOption = document.createElement('option');
    lowOption.value = 'Low';
    lowOption.textContent = 'Low';
    const mediumOption = document.createElement('option');
    mediumOption.value = 'Medium';
    mediumOption.textContent = 'Medium';
    const highOption = document.createElement('option');
    highOption.value = 'High';
    highOption.textContent = 'High';
    prioritySelect.appendChild(lowOption);
    prioritySelect.appendChild(mediumOption);
    prioritySelect.appendChild(highOption);

    // creating addtask button

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';

    // adding inputs to form

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(projectLabel);
    form.appendChild(projectSelect);
    form.appendChild(priorityLabel);
    form.appendChild(prioritySelect);
    form.appendChild(submitButton);

    addtaskDiv.appendChild(form);

    // submitting form logic

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const task = {
            title: titleInput.value,
            description: descInput.value,
            dueDate: dateInput.value,
            priority: prioritySelect.value,
            project: projectSelect.value,
        };

        projects[projectSelect.value].push(task);

        titleInput.value = '';
        descInput.value = '';
        dateInput.value = '';
        prioritySelect.value = 'Low';

        changeheadertoHome();
        displayTasks();
    });
}

// PROJECT MENU
function projectsMenu() {
    projectsDiv.innerHTML = '';
    projectsDisplay();
}

function projectsDisplay() {
    homeDiv.style.display = 'none';
    addtaskDiv.style.display = 'none';
    projectsDiv.style.display = 'grid';

    // creating projectlist div
    let projectList = document.querySelector('.project-list');
    if (!projectList) {
        projectList = document.createElement('div');
        projectList.className = 'project-list';
        projectsDiv.appendChild(projectList);
    }
    
    // Clear existing projects list to avoid duplicates
    projectList.innerHTML = '';

    // creating initial project page
    for (let project in projects) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.innerHTML = `<h3>${project}</h3>`;
        projectDiv.addEventListener('click', () => displayProjectTasks(project));
        projectList.appendChild(projectDiv);
    }

    // new project HTML
    let newProjectForm = document.querySelector('.project-form');
    if (!newProjectForm) {
        newProjectForm = document.createElement('form');
        newProjectForm.className = 'project-form';
        const newProjectInput = document.createElement('input');
        newProjectInput.type = 'text';
        newProjectInput.placeholder = 'New Project Name';
        const newProjectButton = document.createElement('button');
        newProjectButton.textContent = 'Add Project';
        newProjectForm.appendChild(newProjectInput);
        newProjectForm.appendChild(newProjectButton);
    
        // new project logic
        newProjectForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newProjectName = newProjectInput.value.trim();
            if (newProjectName && !projects[newProjectName]) {
                projects[newProjectName] = [];
                newProjectInput.value = '';
                projectsDisplay();
            }
        });
    
        projectsDiv.appendChild(newProjectForm);
    }
}

function displayProjectTasks(projectName) {
    projectsDiv.innerHTML = '';
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Projects';
    backButton.addEventListener('click', projectsMenu);
    projectsDiv.appendChild(backButton);

    const projectTasks = document.createElement('div');
    projectTasks.className = 'project-tasks';
    projectsDiv.appendChild(projectTasks);

    projects[projectName].forEach((task, index) => {
        const taskDiv = createTaskBox(task, projectName, index);
        projectTasks.appendChild(taskDiv);
    });
}