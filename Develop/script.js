
// Function to get current date from moment.js.
function getTodaysDate() {
    var todaysDate = moment().format("MMM Do YY");
    $("#currentDay").text(todaysDate);
}

// Creating array info for time blocks.

var timeBlock = [
    {
        id: "0",
        hour: "7",
        time: "07",
        meridiem: "am",
        task: "",
    }, 
    {
        id: "1",
        hour: "8",
        time: "08",
        meridiem: "am",
        task: "", 
    },
    {
        id: "2",
        hour: "9",
        time: "09",
        meridiem: "am",
        task: "",
    },
    {
        id: "3",
        hour: "10",
        time: "10",
        meridiem: "am",
        task: "",
    },
    {
        id: "4",
        hour: "11",
        time: "11",
        meridiem: "am",
        task: "",
    },
    {
        id: "5",
        hour: "12",
        time: "12",
        meridiem: "pm",
        task: "",
    },
    {
        id: "6",
        hour: "1",
        time: "13",
        meridiem: "pm",
        task: "",
    },
    {
        id: "7",
        hour: "2",
        time: "14",
        meridiem: "pm",
        task: "",
    },
    {
        id: "8",
        hour: "3",
        time: "15",
        meridiem: "pm",
        task: "",
    },

];

//creating visuals for timeblocks.
timeBlock.forEach(function(thisHour) {
    var hourRow = $("<form>")
    .attr({"class": "row"
    });

    $(".container").append(hourRow);

    var hourField = $("<div>")
    .text(`${thisHour.hour}${thisHour.meridiem}`)
    .attr({"class": "col-md-1 hour"
    });

    var hourText = $("<div>")
    .attr({"class": "col-md-10 description p-0"});

    var textArea = $("<textarea>");
    hourText.append(textArea);
    textArea.attr("id",thisHour.id);
    if(thisHour.time < moment().format("HH")) {
        textArea.attr ({
            "class": "past",
        })
    }else if(thisHour.time === moment().format("HH")) {
        textArea.attr ({
            "class": "present"
        })
    }else if(thisHour.time > moment().format("HH")) {
        textArea.attr ({
            "class": "future"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
    .attr({
        "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourText, savePlan);
})

function saveReminders() {
    localStorage.setItem("timeBlock", JSON.stringify(timeBlock));
}

function displayReminders() {
    timeBlock.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var savedInfo = JSON.parse(localStorage.getItem("timeBlock"));

    if(savedInfo) {
        timeBlock = savedInfo;
    }
    saveReminders();
    displayReminders();
}

init();

// Sets header date to current day
getTodaysDate();

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    timeBlock[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})