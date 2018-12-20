let myTasksTemplate =
  '<div class="taskboxgeneral">' +
  '<p class="first">Reward: <span></span></p>' +
  '<p class="first">Day/Time: <span> &nbsp; &nbsp; </span></p>' +
  '<p class="second"><span><a href="" class="edit">Edit</a></span>  <span><a href="" class="delete">Delete</a></span> <span><a href="" class="completed">Completed</a></span></p>' +
  "</div>";

let serverBase = "//localhost:8080/";
const TASKS_LIST_URL = serverBase + "myTasks";

// get method Display all tasks
function getAndDisplayTasksList() {
  console.log("Retrieving tasks list");
  $.getJSON(TASKS_LIST_URL, function(tasks) {
    console.log("Rendering tasks list");
    var taskItems = tasks.map(function(task) {
      var element = $(myTasksTemplate);
      element.attr("id", item.id);
      var itemName = element.find(".js-reward-item-name");
      itemName.text(item.name);
      element.attr("data-checked", item.checked);
      if (item.checked) {
        itemName.addClass("tasks-item__compelted");
      }
      return element;
    });
    $(".js-reward-list").html(itemElements);
  });
}


// delete method (DELETE)
function deleteTask() {
  let message = "an error occured while deleting";
  $('.delete').on('click',function () {
      $.ajax({
          url: TASKS_LIST_URL + "/" + req.params.id,
          method: 'DELETE',
          dataType: 'json',
          contentType: 'application/json',
          success: function() {
              $('.modal3').css('display','block');
              $('.overlay').css('display','block');
              } else {
              $('.delete').html(message);
              }
          }
       });
      return false;
  });

// Post method ( CREATE )
function addTask(task) {
  console.log("Adding task: " + task);
  $.ajax({
    method: "POST",
    url: TASKS_LIST_URL,
    data: JSON.stringify(task),
    success: function(data) {
      getAndDisplayTasks();
$('.taskboxadd').on('click',function () {
  $('.modal1').css('display','block');
  $('.overlay').css('display','block');
});

    },
    dataType: "json",
    contentType: "application/json"
  });
}

function addRewardItem(item) {
  console.log("Adding reward item: " + item);
  $.ajax({
    method: "POST",
    url: TASKS_LIST_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayRewardList();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

// put method (UPDATE) tasks 
function updateTask(task) {
  $('.delete').on('click',function () {
  $.ajax({
    url: TASKS_LIST_URL + "/" + task.id,
    method: "PUT",
    data: tasks,
    success: function(data) {
  $('.edit').on('click',function () {
    $('.modal2').css('display','block');
    $('.overlay').css('display','block');
    return false;
});
      getAndDisplayTask();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

$(function() {

});
