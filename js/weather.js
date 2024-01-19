// !=================================== Assign Global Variable ============================================>

let searchInput = document.getElementById("searchLocationInput");
let searchBtn = document.getElementById("searchBtn"),
  apiResponse,
  response;

let subscribe = document.getElementById("subscribe-input");
let subscribeBtn = document.getElementById("subscribe-btn");
let subscribeContainer = document.getElementById("subscribe-container");
let message = document.getElementById("message");
let homePage = document.getElementById("homePage");
let contactPage = document.getElementById("contactPage");

// !=================================== Assign Today Variable ============================================>
let todayDay = document.getElementById("today-day"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("city-location"),
  countryLocation = document.getElementById("country-location"),
  todayTemp = document.getElementById("today-temp"),
  todayImg = document.getElementById("today-img"),
  todayStatus = document.getElementById("today-status"),
  humidty = document.getElementById("humidty"),
  windSpeed = document.getElementById("wind-speed"),
  windDirection = document.getElementById("wind-direction");

// !=================================== Assign NextDay Variable ============================================>
let nextDay = document.getElementsByClassName("nextday"),
  nextdayIcon = document.getElementsByClassName("nextday-icon"),
  nextdayMax = document.getElementsByClassName("nextday-max"),
  nextdayMin = document.getElementsByClassName("nextday-min"),
  nextdayStatus = document.getElementsByClassName("nextday-status");

// !=================================== Assign Month and Days Array ============================================>
let monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
  ];

// !=================================== function Get weather () ============================================>

async function getWeather(currentCity = "cairo") {
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`
  );
  response = await apiResponse.json();
  console.log(response);
  displayTodayWeather();
  nextDayWeather();
}

getWeather();
// !=================================== function display Today Weather ()  ============================================>

function displayTodayWeather() {
  let date = new Date();
  todayDay.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()}  ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = response.location.name;
  countryLocation.innerHTML = response.location.country;
  todayTemp.innerHTML = `${response.current.temp_c}<sup>o</sup>C`;
  todayImg.setAttribute("src", `https:${response.current.condition.icon}`);
  todayStatus.innerHTML = response.current.condition.text;
  humidty.innerHTML = response.current.humidity;
  windSpeed.innerHTML = response.current.wind_kph;
  windDirection.innerHTML = response.current.wind_dir;
}
// !=================================== function next Day Weather () ============================================>
function nextDayWeather() {
  let date = new Date();
  console.log(date.getDay());
  let day = date.getDay();

  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[day + i + 1];
    nextdayIcon[i].setAttribute(
      "src",
      `https:${response.forecast.forecastday[i + 1].day.condition.icon}`
    );
    nextdayMax[i].innerHTML = `${
      response.forecast.forecastday[i + 1].day.maxtemp_c
    }<sup>o</sup>C`;
    nextdayMin[i].innerHTML = `${
      response.forecast.forecastday[i + 1].day.mintemp_c
    }<sup>o</sup>C`;
    nextdayStatus[i].innerHTML =
      response.forecast.forecastday[i + 1].day.condition.text;
  }
}

//
// ?=================================== clicking to the subscribe button ============================================>
subscribeBtn.addEventListener("click", function () {
  if (subscribe.value.length == 0) {
    Swal.fire({
      text: "You Should Write Your Email!",
      icon: "warning",
    });
  } else {
    if (emailValidation() === true) {
      Swal.fire({
        title: "Success!",
        text: "Subscribed!",
        icon: "success",
      });
      subscribe.value = "";
      subscribe.classList.remove("is-valid");
      message.classList.add("d-none");
    } else {
      Swal.fire({
        title: "Wrong!",
        text: "You Should Write Valid Email!",
        icon: "error",
      });
    }
  }
});
// !=================================== Validation Function of the Email ============================================>
function emailValidation() {
  let userEmailTxt = subscribe.value;
  let regexName = /^[a-z]{4,15}(\d{2,7})?@(yahoo|gmail)\.com$/;
  if (regexName.test(userEmailTxt) == true) {
    subscribe.classList.add("is-valid");
    subscribe.classList.remove("is-invalid");
    message.classList.remove("d-none");
    message.innerHTML =
      '<i class="fa-solid fa-check text-success fs-6 m-3"></i><span>Valid Email</span>';

    return true;
  } else {
    subscribe.classList.add("is-invalid");
    subscribe.classList.remove("is-valid");
    message.classList.remove("d-none");
    message.innerHTML =
      '<i class="fa-solid fa-xmark text-danger fs-6 m-3"></i>The Email Must be Valid - example@gmail.com';

    return false;
  }
}

// ?=======> clicking outside the input to clear all class (is-valid , is-invalid) and add (d-none) for message
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("exit")) {
    subscribe.classList.remove("is-valid");
    subscribe.classList.remove("is-invalid");
    message.classList.add("d-none");
    subscribe.value = "";
  }
});

// *=============================> go to contact page <===============================
contactPage.addEventListener("click", function () {
  window.location = "./pages/contact.html";
});
// *=================================== Search location Weather ============================================>
searchInput.addEventListener("keyup", function () {
  if (searchInput.value.length > 2) {
    currentCity = searchInput.value;
    console.log(currentCity);
    getWeather(currentCity);
  }
});
