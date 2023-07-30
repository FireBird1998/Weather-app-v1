// Importing the getWeather function from the weather.js file and the ICON_MAP constant from the iconMap.js file.
import { getWeather } from "./public/Js/weather.js";
import { ICON_MAP } from "./public/Js/iconMap.js";

// Requesting the user's geolocation using the browser's navigator.geolocation API.
navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

// Function to handle the successful retrieval of the user's geolocation.
function positionSuccess({ coords }) {
    // Call the getWeather function with latitude, longitude, and the user's timezone.
    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then(({ current, daily, hourly }) => renderWeather(current, daily, hourly))
        .catch(e => {
            // Display an error message if there is an issue fetching weather data.
            console.error(e);
            alert("Error getting weather: " + e.message);
        });
}

// Function to handle errors in geolocation retrieval.
function positionError() {
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    alert("There was an error getting your location.");
}

// Function to render all weather data to the UI.
function renderWeather(current, daily, hourly) {
    // Call three rendering functions for current, daily, and hourly weather data.
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);
    // Remove the "blurred" class from the document body to unblur the UI after data is loaded.
    document.body.classList.remove("blurred");
}

// Function to set text content of an element with a specific data attribute.
function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value;
}

// Function to get the URL of the weather icon based on its icon code.
function getIconUrl(iconCode) {
    return `public/icons/${ICON_MAP.get(iconCode)}.svg`;
}

// Querying the DOM for the current weather icon element.
const currentIcon = document.querySelector("[data-current-icon]");

// Function to render the current weather data to the UI.
function renderCurrentWeather(current) {
    // Set the current weather icon using the iconCode.
    currentIcon.src = getIconUrl(current.iconCode);
    // Set various weather data elements using the setValue function.
    setValue("current-temp", current.currentTemp);
    setValue("current-high", current.highTemp);
    setValue("current-low", current.lowTemp);
    setValue("current-fl-high", current.highFeelsLike);
    setValue("current-fl-low", current.lowFeelsLike);
    setValue("current-wind", current.windSpeed);
    setValue("current-precip", current.precip);
}

// Querying the DOM for the daily weather section element.
const dailySection = document.querySelector("[data-day-section]");
// Getting the day-card-template element as a template for rendering daily weather data.
const dayCardTemplate = document.getElementById("day-card-template");
// Internationalization object for formatting day names.
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });

// Function to render the daily weather data to the UI.
function renderDailyWeather(daily) {
    // Clear the current content of the daily weather section to prepare for rendering.
    dailySection.innerHTML = "";
    // Loop through each day in the daily data.
    daily.forEach(day => {
        // Clone the day-card-template content to create a new day element.
        const element = dayCardTemplate.content.cloneNode(true);
        // Set the temperature and date for the day using the setValue function.
        setValue("temp", day.maxTemp, { parent: element });
        const date = new Date(day.timestamp);
        setValue("date", DAY_FORMATTER.format(date), { parent: element });
        // Set the weather icon for the day using the iconCode.
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode);
        // Append the new day element to the daily weather section.
        dailySection.append(element);
    });
}

// Querying the DOM for the hourly weather section element.
const hourlySection = document.querySelector("[data-hour-section]");
// Getting the hour-card-template element as a template for rendering hourly weather data.
const hourRowTemplate = document.getElementById("hour-card-template");
// Internationalization object for formatting hour values.
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

// Function to render the hourly weather data to the UI.
function renderHourlyWeather(hourly) {
    // Clear the current content of the hourly weather section to prepare for rendering.
    hourlySection.innerHTML = "";
    // Loop through each hour in the hourly data.
    hourly.forEach(hour => {
        // Clone the hour-card-template content to create a new hour element.
        const element = hourRowTemplate.content.cloneNode(true);
        // Set various weather data elements for the hour using the setValue function.
        setValue("temp", hour.temp, { parent: element });
        setValue("fl-temp", hour.feelsLike, { parent: element });
        setValue("wind", hour.windSpeed, { parent: element });
        setValue("precip", hour.precip, { parent: element });
        // Format the day and time for the hour using the DAY_FORMATTER and HOUR_FORMATTER objects.
        const day = new Date(hour.timestamp);
        setValue("day", DAY_FORMATTER.format(day), { parent: element });
        setValue("time", HOUR_FORMATTER.format(day), { parent: element });
        // Set the weather icon for the hour using the iconCode.
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode);
        // Append the new hour element to the hourly weather section.
        hourlySection.append(element);
    });
}
