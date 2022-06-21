/*GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/
$(document).ready(function(){

    $('.saveBtn').on('click', function(){
        var text = $(this).siblings('.description').val()
        var time = $(this).parent().attr('id');
        console.log(text)
        localStorage.setItem(time,text)
    })

    function hourCheck() {
        var currentHour = moment().hours()
        $('.time-block').each(function() {
            var hourValue = parseInt($(this).attr('id').split('-')[1])
            if(hourValue < currentHour){
                $(this).addClass('past')
            } else if ( hourValue === currentHour) {
                $(this).removeClass('past');
                $(this).addClass('present');
            } else  {
                $(this).removeClass('present')
                $(this).removeClass('past')
                $(this).addClass('future')
            };
        })

    }

    hourCheck()
    var check = setInterval(hourCheck,20000)

    $('#hour-7 .description').val(localStorage.getItem('hour-7'))
    $('#hour-8 .description').val(localStorage.getItem('hour-8'))
    $('#hour-9 .description').val(localStorage.getItem('hour-9'))
    $('#hour-10 .description').val(localStorage.getItem('hour-10'))
    $('#hour-11 .description').val(localStorage.getItem('hour-11'))
    $('#hour-12 .description').val(localStorage.getItem('hour-12'))
    $('#hour-13 .description').val(localStorage.getItem('hour-13'))

    $('#currentDay').text(moment().format("MMM Do YY"))
})
