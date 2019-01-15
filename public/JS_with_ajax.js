let myTasksTemplate =
    '<div class="taskboxgeneral">' +
    '<p class="first">Reward: <span></span></p>' +
    '<p class="first">Day/Time: <span> &nbsp; &nbsp; </span></p>' +
    '<p class="second"><span><a href="" class="edit">Edit</a></span>  <span><a href="" class="delete">Delete</a></span> <span><a href="" class="completed">Completed</a></span></p>' +
    "</div>";

let serverBase = "http://localhost:8080/";
const TASKS_LIST_URL = serverBase + "myTasks";
console.log(TASKS_LIST_URL);
function allClickEvents() {
    $(document).on('click', function() {
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
    });
    $('.taskboxadd').on('click',function () {
        $('.modal1').css('display','block');
        $('.overlay').css('display','block');
    });
    $(document).delegate('.taskboxgeneral','click',function (event) {
        event.preventDefault();
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
        $(this).addClass("taskboxgeneralexpended");
        event.stopPropagation();
    });

};
// put method  (Create)
function addTask() {
    $('#js-tasks-list-form').on('submit',function () {
        event.preventDefault();
        let data = {
            taskname: $('#taskname').val(),
            reward: $('#reward').val(),
            complete: false,
            created_at: new Date().getDate(),
            updated_at: new Date().getDate()
        };
        // data = JSON.stringify(data);
        console.log(data);
        $.ajax({
            method: "POST",
            data: data,
            dataType: 'json',
            url: TASKS_LIST_URL,
            success: function(data) {
                console.log(data);
                $('.modal1').css('display','none');
                $('.overlay').css('display','none');
                window.location.reload();
            },
            error:function (xhr, ajaxOptions, thrownError) {
              console.log(thrownError);
              console.log(ajaxOptions);
            }
        });
    });
}
function getTasks() {
    $.getJSON( TASKS_LIST_URL, function( data ) {
        console.log(data);
        $.each(data.tasks.reverse(),function (index,item) {
            var d=new Date(item.create_at);
            var fdate=(d.getMonth() + 1)+"-"+d.getDate()+"-"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            console.log(fdate);
            if(!item.complete){
                var itr=  `<div class="taskboxgeneral">` +
                    `<p class="first">Task: <span>${item.taskName}</span></p>` +
                    `<p class="first">Reward: <span>${item.rewardType}</span></p>` +
                    `<p class="first">Day/Time: <span> ${fdate} </span></p>` +
                    `<p class="second"><span><a href="${item.id}" class="edit">Edit</a></span>  <span><a href="${item.id}"  class="delete">Delete</a></span> <span><a href="${item.id}" class="completed">Completed</a></span></p>` +
                    "</div>";
                $('.mainbody').append(itr);
            }
            console.log(item)
        })
        $.each(data.tasks,function (index,item) {
            var d=new Date(item.create_at);
            var fdate=d.getDate()+"-"+(d.getMonth() + 1)+"-"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            console.log(fdate);
            if(item.complete){
                var itr=  `<div class="taskboxgeneralCompleted">` +
                    `<p class="first text-center">Completed Task</span></p>` +
                    `<p class="first">Task: <span>${item.taskName}</span></p>` +
                    `<p class="first">Reward: <span>${item.rewardType}</span></p>` +
                    `<p class="first">Day/Time: <span> ${fdate} </span></p>` +
                    `<p class="second"><span><a href="${item.id}"  class="delete">Delete</a></span> </p>` +
                    "</div>";
                $('.mainbody').append(itr);
            }
            console.log(item)
        })
    })
}
// put method  (UPDATE)
function updateTask() {
    let editid;
    $(document).delegate('.edit','click',function () {
        editid=$(this).attr('href');
        $.getJSON( TASKS_LIST_URL+'/'+editid, function( data ) {
            console.log(data);
            let i=1, earray=[];
            $.each(data,function (index,item) {
                console.log(item);
                earray[i]=item;
                i++;
            });
            console.log(earray);
                let edit_dom=`
            <label for="task">Task Name:</label>
            <input type="text" id="task" value="${earray[2]}">
            <br>
            <label for="reward1">Create Reward:</label>
            <input type="text" id="reward1" value="${earray[3]}">
            <br>
            <button type="submit" class="updateTask">Update</button>`;
                $('.modal2>form').html(edit_dom);

        });
        $('.modal2').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $(document).delegate('.updateTask','click', function () {
        let tasks = {
            taskName: $('#task').val(),
            rewardType: $('#reward1').val()
        };
        console.log(tasks);
        $.ajax({
            url: TASKS_LIST_URL + "/" + editid,
            method: "PUT",
            data: tasks,
            success: function () {
                alert("Item Updated Successfully");
                window.location.reload();
                return false;
            }
        })
    })
}
//Complete Task
function markcompletetask() {
    let completeId;
    $(document).delegate('.completed','click',function () {
        completeId=$(this).attr('href');
        $('.modal4').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $(document).delegate('.completeTaskButton','click', function () {
        let tasks = {
            complete: true,
        };
        console.log(completeId);
        $.ajax({
            url: TASKS_LIST_URL + "/complete/" + completeId,
            method: "PUT",
            data: tasks,
            success: function (data) {
                console.log(data);
                window.location.reload();
                return false;
            }
        })
    })
}
// delete method (DELETE)
function deleteTask() {
    let deleteid;
    $(document).delegate('.delete','click',function (event) {
        event.preventDefault();
        deleteid=$(this).attr('href');
        $('.modal3').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $('#confirmdelete').on('click',function () {
        console.log(deleteid);
        $.ajax({
            url:  TASKS_LIST_URL + "/" + deleteid,
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                alert("Item Deleted Successfully");
                window.location.reload();
                return false;
            },
        });
    });
}


// get completed tasks 
function getCompletedTask() {
    $('.completed').on('click', function () {
        $.ajax({
            url: TASKS_LIST_URL + "/" + req.params.id,
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                $('.completed').on('click', function () {
                    $('.modal4').css('display', 'block');
                    $('.overlay').css('display', 'block');
                    return false;
                });
            }
        })
    });
}
function showModal() {
    $('.overlay').on('click', function () {
        $('.modalBox').css('display', 'none');
        $(this).css('display', 'none');
    });
};

function main() {

        getTasks();
        deleteTask();
        addTask();
        updateTask();
        markcompletetask();
        showModal();
        allClickEvents();
};
$(main);