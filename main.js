import "./style.css"
import { getWeather } from "./public/Js/weather"
import { ICON_MAP } from "./public/Js/iconMap";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({coords}){
    getWeather(
        coords.latitude,
        coords.longitude, 
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    .then(({ current, daily, hourly }) => renderWeather(current, daily, hourly))
    .catch(e => {
        console.error(e);
        alert("error getting weather." + e.message);
    });
}

function positionError(){
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    alert("There is a error getting your location ")
}


function renderWeather(current, daily, hourly){
    renderCurrentWeather(current)
    renderDailyWeather(daily) 
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}

function setValue(selector, value, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode){
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector("[data-current-icon]")

function renderCurrentWeather(current){
    currentIcon.src = getIconUrl(current.iconCode);
    setValue("current-temp", current.currentTemp);
    setValue("current-high", current.highTemp);
    setValue("current-low", current.lowTemp);
    setValue("current-fl-high", current.highFeelsLike);
    setValue("current-fl-low", current.lowFeelsLike);
    setValue("current-wind", current.windSpeed);
    setValue("current-precip", current.precip);
}

const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: "long"})

function renderDailyWeather(daily){
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, {parent: element})
        const date = new Date(day.timestamp);
        setValue("date", DAY_FORMATTER.format(date), {parent: element});
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)

    });
}


const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-card-template")
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "numeric"})
function renderHourlyWeather(hourly){
    hourlySection.innerHTML = ""
    hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        console.log(hour)
        setValue("temp", hour.temp, {parent: element})
        setValue("fl-temp", hour.feelsLike, {parent: element})
        setValue("wind", hour.windSpeed, {parent: element})
        setValue("precip", hour.precip, {parent: element})
        const day = new Date(hour.timestamp);
        setValue("day", DAY_FORMATTER.format(day), {parent: element});
        
        setValue("time", HOUR_FORMATTER.format(day), {parent: element});
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        hourlySection.append(element)
    });
}