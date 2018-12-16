'use strict'

// Sample Data
const DATA = [
    {task: "do Home work",reward:'swimming pool', completed: false},
    {task: "wash dishes",reward:'go to the park', completed: false},
    {task: "brush teeth",reward:'watch movie', completed: true},
    {task: "sleep on time",reward:'play playstation', completed: false}
];
  
function generateItemElement(item, itemIndex, template) {
    return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        Task:<span class="tasks-item js-tasks-item ${item.completed ? "tasks-item__checked" : ''}">${item.task}</span><br>
        Reward:<span class="tasks-item js-tasks-item ${item.completed ? "tasks-item__checked" : ''}">${item.reward}</span>
        <div class="tasks-item-controls">
          <button class="tasks-item-toggle js-item-toggle">
              <span class="button-label">Completed</span>
          </button>
          <button class="tasks-item-delete js-item-delete">
              <span class="button-label">Remove</span>
          </button>
        </div>
      </li>`;
}
  
function generateTasksItemsString(tasksList) {
    const items = tasksList.map((item, index) => generateItemElement(item, index)); 
    return items.join("");
}
 
// not linked yet
function renderTasksList() {
    const tasksListItemsString = generateTasksItemsString(DATA);
    $('.js-tasks-list').html(tasksListItemsString);
}

// bring data from other file
function addItemToTasksList(reward,task) {
    DATA.push({task: task, reward: reward, completed: false});
}

function handleNewItemSubmit() {
    $('#js-tasks-form').submit(function(event) {
      event.preventDefault();
      const reward = $('#js-reward-list-entry').val();
      const taskname = $('#task-select').val();
      console.log(taskname);
      $('.js-reward-list-entry').val('');
      addItemToTasksList(reward,taskname);
        renderTasksList();
    });
}

function toggleCheckedForListItem(itemIndex) {
   DATA[itemIndex].completed = !DATA[itemIndex].completed;
}

function getItemIndexFromElement(item) {
    const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
    return parseInt(itemIndexString, 10);
}
  
function handleItemCheckClicked() {
    $('.js-tasks-list').on('click', `.js-item-toggle`, event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      toggleCheckedForListItem(itemIndex);
      renderTasksList();
      alert("Congratulations! You have completed the task and you deserve reward");
    });
  }

function deleteListItem(itemIndex) {
    DATA.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
    $('.js-tasks-list').on('click', '.js-item-delete', event => {
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      deleteListItem(itemIndex);
      renderTasksList();
    });
}

function handleTasksList() {
    renderTasksList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}
  
$(handleTasksList);
 