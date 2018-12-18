function allClickEvents() {
    $(document).on('click', function() {
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
    });
    $('.taskboxgeneral').on('click',function (event) {
        $('.taskboxgeneralexpended').removeClass('taskboxgeneralexpended');
        $(this).addClass("taskboxgeneralexpended");
        event.stopPropagation();
    });
    $('.taskboxadd').on('click',function () {
        $('.modal1').css('display','block');
        $('.overlay').css('display','block');
    });
    $('.edit').on('click',function () {
        $('.modal2').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $('.delete').on('click',function () {
        $('.modal3').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $('.completed').on('click',function () {
        $('.modal4').css('display','block');
        $('.overlay').css('display','block');
        return false;
    });
    $('.overlay').on('click', function () {
        $('.modalBox').css('display','none');
        $(this).css('display','none');
    })
}
function main() {
    allClickEvents();
}
$(main);