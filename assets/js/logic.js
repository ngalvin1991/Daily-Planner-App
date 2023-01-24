// AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively

// Acceptance Criteria
// The app should:

// Display the current day at the top of the calendar when a user opens the planner.

// Present timeblocks for standard business hours when the user scrolls down.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock.

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page.



//Main variables
//will be used in a fucntion to generate the different times. 
var timeBlockLi = document.getElementById("timeBlockLi");
//this will be used for the current day function. 
var currentDayShow = document.getElementById("currentDay");
//will show the different times at the side of each calendar row.
var timeBlockInput = ["08:00am", "09:00am", "10:00am", "11:00am", "12:00pm", "13:00pm", "14:00pm",
    "15:00pm", "16:00pm", "17:00pm", "18:00pm"];


function CurrentDateTime() {
    var currentDT = moment().format('MMMM Do YYYY, h:mm:ss a');
    currentDayShow.innerHTML = currentDT;
    currentDayShow.innerHTML = "Today's Date: " + currentDT;
}
setInterval(CurrentDateTime, 1000);


//this function gets all of the times stated in the timeBlockInput array above and 
//displays thehe list on the page.
getTimeBlock();
function getTimeBlock() {
    timeBlockLi.innerHTML = "";

    for (var i = 0; i < timeBlockInput.length; i++) {
        var listHours = timeBlockInput[i];

        var hoursRow = document.createElement("div");
        hoursRow.classList.add("row");
        timeBlockLi.appendChild(hoursRow);

        var hours = document.createElement("div");
        hours.innerHTML = listHours;
        hours.classList.add("hour");
        hoursRow.appendChild(hours);

        var textInput = document.createElement("textarea");
        textInput.placeholder = "Enter Your Task Here!";
        textInput.setAttribute("class", "description");
        textInput.setAttribute("id", i);
        hoursRow.appendChild(textInput);

        var saveTask = document.createElement("button");
        saveTask.textContent = "Save";
        saveTask.classList.add("saveBtn");
        saveTask.setAttribute("value", i);
        hoursRow.appendChild(saveTask);
    }
}


// the function below will allow the user to save their tasks. 
$(document).on('click', '.saveBtn', function () {
    var saveUserTask = $(this).val();
    var userDescription = document.getElementById(saveUserTask).value;
    localStorage.setItem(saveUserTask, userDescription);
});

// This function will update the color of the time blocks whether they are in the past, present or future: 
function colorTimeBlocks () {
    var currentTime = moment().format('h a');
    var hourNow = moment(currentTime, 'h a');
    var setTask = document.getElementsByClassName('description')

    for (var i = 0; i < setTask.length; i++) {
        var block = moment(timeBlockInput[i], 'h a');
        if (hourNow.isSame(block) === true) {
            setTask[i].classList.add('present')
            setTask[i].classList.remove('future')
            setTask[i].classList.remove('past')
        } else if (hourNow.isBefore(block) === true) {
            setTask[i].classList.add('future')
            setTask[i].classList.remove('past')
            setTask[i].classList.remove('present')
        } else if (hourNow.isBefore(block) === false) {
            setTask[i].classList.add('past')
            setTask[i].classList.remove('future')
            setTask[i].classList.remove('present')
        }
    }
}
colorTimeBlocks()
setInterval(colorTimeBlocks, 10000);

//This function gets the stored notes and adds them back to the page when loaded.
function grabStoredNotes () {
    for (var i = 0; i < timeBlockInput.length; i++) {
        var getStoredNotes = localStorage.getItem(i);
        var textArea = document.getElementById(i);
        textArea.innerText = getStoredNotes;
    }
}
grabStoredNotes();

