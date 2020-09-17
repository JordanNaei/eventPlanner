var buttonsList = document.querySelectorAll(".pressBtn");
var textAreaList = document.querySelectorAll(".textarea");
var currentDateDisplay = document.getElementById("currentDay");
currentDateDisplay.textContent = moment().format("MMMM Do YYYY");

console.log(buttonsList);


function timeTracker() {
  var timerInterval = setInterval(function () {
    watchHour = moment().hours();
    watchMinute = moment().minutes();
    if ((watchHour == 18 && watchMinute > 0) && (watchHour <=24)) {
        clearInterval();
        console.log("No need to run forver");
    }
  else {
    calendarTracker(watchHour);
  }
  }, 1000);
}

function calendarTracker(h) {
  for (var c = 0; c < textAreaList.length; c++) {
    if (h == textAreaList[c].id) {
      textAreaList[c].classList.remove("class", "future");
      textAreaList[c].classList.add("class", "present");
    } else if (h > textAreaList[c].id) {
      textAreaList[c].classList.remove("class", "future");
      textAreaList[c].classList.remove("class", "present");
      textAreaList[c].classList.add("class", "past");
      textAreaList[c].disabled = true;
      buttonsList[c].disabled = true;
    } else if (h < textAreaList[c].id) {
      console.log("You are in the futures");
    }
  }
}

function saveEvents(n) {
  var event = textAreaList[n].value.trim();
  if (event.length < 1) {
    localStorage.setItem(("event" + n), "");
  } else {
    localStorage.setItem("event" + n, event);
    var eventDate = moment().format("MMMM Do YYYY");
    localStorage.setItem("date" + n, eventDate);
  }
}

function displayCalendarEvent() {
  var dayChecker = moment().format("MMMM Do YYYY");
  for (var j = 0; j < textAreaList.length; j++) {
    var getDate = localStorage.getItem("date" + j);
    if (dayChecker == getDate) {
      var eventTextValue = localStorage.getItem("event" + j).trim();
      if (eventTextValue.length >= 1) {
        textAreaList[j].value = eventTextValue;
      } else {
        console.log("No event to log at this hour");
      }
    }
  }
}

function displayCalendarOnReload() {
  initializingHour = moment().hours();
  for (var c = 0; c < textAreaList.length; c++) {
    if (initializingHour == textAreaList[c].id) {
      textAreaList[c].classList.remove("class", "future");
      textAreaList[c].classList.add("class", "present");
    } else if (initializingHour > textAreaList[c].id) {
      textAreaList[c].classList.remove("class", "future");
      textAreaList[c].classList.remove("class", "present");
      textAreaList[c].classList.add("class", "past");
      textAreaList[c].disabled = true;
      buttonsList[c].disabled = true;
    } else if (initializingHour < textAreaList[c].id) {
      console.log("You are in the futures");
    }
  }
}

for (var i = 0; i < buttonsList.length; i++) {
  buttonsList[i].addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e);
    saveEvents(e.toElement.id);
  });
}

displayCalendarOnReload();
displayCalendarEvent();
timeTracker();

