let rewardItemTemplate =
  '<li class="js-reward-item">' +
  '<p><span class="reward-item js-reward-item-name"></span></p>' +
  '<div class="reward-item-controls">' +
  '<button class="js-reward-item-toggle">' +
  '<span class="button-label">completed</span>' +
  "</button>" +
  '<button class="js-reward-item-delete">' +
  '<span class="button-label">delete</span>' +
  "</button>" +
  "</div>" +
  "</li>";

// let taskTemplate =
//   '<div class="task js-task">' +
//   '<h3 class="js-task-name"><h3>' +
//   "<hr>" +
//   '<ul class="js-task-habits">' +
//   "</ul>" +
//   '<div class="task-controls">' +
//   '<button class="js-task-delete">' +
//   '<span class="button-label">delete</span>' +
//   "</button>" +
//   "</div>" +
//   "</div>";

let serverBase = "//localhost:8080/";
// const TASKS_URL = serverBase + "tasks";
const REWARD_LIST_URL = serverBase + "reward-list";

// function getAndDisplayTasks() {
//   console.log("Retrieving tasks");
//   $.getJSON(TASKS_URL, function(tasks) {
//     console.log("Rendering tasks");
//     var taskElement = tasks.map(function(task) {
//       var element = $(recipeTemplate);
//       element.attr("id", task.id);
//       element.find(".js-task-name").text(task.name);
//       task.habits.forEach(function(habit) {
//         element
//           .find(".js-task-habits")
//           .append("<li>" + habit + "</li>");
//       });
//       return element;
//     });
//     $(".js-tasks").html(tasksElement);
//   });
// }

function getAndDisplayRewardList() {
  console.log("Retrieving reward list");
  $.getJSON(REWARD_LIST_URL, function(items) {
    console.log("Rendering reward list");
    var itemElements = items.map(function(item) {
      var element = $(rewardItemTemplate);
      element.attr("id", item.id);
      var itemName = element.find(".js-reward-item-name");
      itemName.text(item.name);
      element.attr("data-checked", item.checked);
      if (item.checked) {
        itemName.addClass("reward-item__checked");
      }
      return element;
    });
    $(".js-reward-list").html(itemElements);
  });
}

// function addTask(task) {
//   console.log("Adding task: " + task);
//   $.ajax({
//     method: "POST",
//     url: TASKS_URL,
//     data: JSON.stringify(task),
//     success: function(data) {
//       getAndDisplayTasks();
//     },
//     dataType: "json",
//     contentType: "application/json"
//   });
// }

function addRewardItem(item) {
  console.log("Adding reward item: " + item);
  $.ajax({
    method: "POST",
    url: REWARD_LIST_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayRewardList();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

// function deleteTask(taskId) {
//   console.log("Deleting task `" + taskId + "`");
//   $.ajax({
//     url: TASKS_URL + "/" + taskId,
//     method: "DELETE",
//     success: getAndDisplayTasks
//   });
// }

function deleteRewardItem(itemId) {
  console.log("Deleting reward item `" + itemId + "`");
  $.ajax({
    url: SHOPPING_LIST_URL + "/" + itemId,
    method: "DELETE",
    success: getAndDisplayRewardList
  });
}

// function updateTask(task) {
//   console.log("Updating task `" + task.id + "`");
//   $.ajax({
//     url: TASKS_URL + "/" + task.id,
//     method: "PUT",
//     data: tasks,
//     success: function(data) {
//       getAndDisplayTask();
//     }
//   });
// }

function updateRewardListitem(item) {
  console.log("Updating reward list item `" + item.id + "`");
  $.ajax({
    url: REWARD_LIST_URL + "/" + item.id,
    method: "PUT",
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayRewardList();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

// function handleTaskAdd() {
//   $("#js-task-form").submit(function(e) {
//     e.preventDefault();
//     var habits = $(e.currentTarget)
//       .find("#habits-list")
//       .val()
//       .split(",")
//       .map(function(habit) {
//         return habit.trim();
//       });
//     addRecipe({
//       name: $(e.currentTarget)
//         .find("#task-name")
//         .val(),
//         habits: habits
//     });
//   });
// }

function handleRewardListAdd() {
  $("#js-reward-list-form").submit(function(e) {
    e.preventDefault();
    addRewardItem({
      name: $(e.currentTarget)
        .find("#js-new-item")
        .val(),
      checked: false
    });
  });
}

// function handleTaskDelete() {
//   $(".js-tasks").on("click", ".js-task-delete", function(e) {
//     e.preventDefault();
//     deleteTask(
//       $(e.currentTarget)
//         .closest(".js-task")
//         .attr("id")
//     );
//   });
// }

function handleRewardListDelete() {
  $(".js-reward-list").on("click", ".js-reward-item-delete", function(e) {
    e.preventDefault();
    deleteRewardItem(
      $(e.currentTarget)
        .closest(".js-reward-item")
        .attr("id")
    );
  });
}

function handleRewardCheckedToggle() {
  $(".js-reward-list").on("click", ".js-reward-item-toggle", function(e) {
    e.preventDefault();
    var element = $(e.currentTarget).closest(".js-reward-item");
    var item = {
      id: element.attr("id"),
      checked: !JSON.parse(element.attr("data-checked")),
      name: element.find(".js-reward-item-name").text()
    };
    updateRewardListitem(item);
  });
}

$(function() {
  getAndDisplayRewardList();
  handleRewardListAdd();
  handleRewardListDelete();
  handleRewardCheckedToggle();

//   getAndDisplayRecipes();
//   handleTaskAdd();
//   handleTaskDelete();
});
