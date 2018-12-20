let myTasksTemplate =
  '<div class="taskboxgeneral">' +
  '<p class="first">Reward: <span></span></p>' +
  '<p class="first">Day/Time: <span> &nbsp; &nbsp; </span></p>' +
  '<p class="second"><span><a href="" class="edit">Edit</a></span>  <span><a href="" class="delete">Delete</a></span> <span><a href="" class="completed">Completed</a></span></p>' +
  "</div>";

let serverBase = "//localhost:8080/";
const TASKS_LIST_URL = serverBase + "myTasks";

function allClickEvents() {
    $(document).on('click', function() {
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
    });
    $('.taskboxgeneral').on('click',function (event) {
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
        $(this).addClass("taskboxgeneralexpended");
        event.stopPropagation();
    })
};

// put method  (Create)
function addTask(task) {
    console.log("Adding task: " + task);
    $.ajax({
        method: "POST",
        url: TASKS_LIST_URL,
        data: JSON.stringify(task),
        success: function(data) {
        $('.taskboxadd').on('click',function () {
        $('.modal1').css('display','block');
        $('.overlay').css('display','block');
    })
};

// put method  (UPDATE)
function updateTask() {
    $('.edit').on('click',function () {
    $.ajax({
        url: TASKS_LIST_URL + "/" + req.params.id,
        method: "PUT",
       data: tasks,
        success: function() {
        $('.edit').on('click',function () {
        $('.modal2').css('display','block');
        $('.overlay').css('display','block');
        return false;
    })
});

// delete method (DELETE)
function deleteTask() {
    $('.delete').on('click',function () {
        $.ajax({
            url: TASKS_LIST_URL + "/" + req.params.id,
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            success: function() {    
            $('.modal3').css('display','block');
            $('.overlay').css('display','block');
            return false;
    });
};

// get completed tasks 
function getCompletedTask() {
    $('.completed').on('click',function () {
    $.ajax({
        url: TASKS_LIST_URL + "/" + req.params.id,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
        $('.completed').on('click',function () {
            $('.modal4').css('display','block');
            $('.overlay').css('display','block');
            return false;
    });
};   

function showModal(){
    $('.overlay').on('click', function () {
        $('.modalBox').css('display','none');
        $(this).css('display','none');
    });
};

function main() {
    allClickEvents();
    deleteTask();
    addTask();
    updateTask();
    showModal()
}
$(main);