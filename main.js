import "./style.css"
import { getWeather } from "./weather"
import { ICON_MAP } from "./iconMap";

getWeather(22.6547, 88.4467, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(({ current, daily, hourly }) => renderWeather(current, daily, hourly))
    .catch(e => {
        console.error(e);
        alert("error getting weather." + e.message);
    });



function renderWeather(current, daily, hourly){
    renderCurrentWeather(current)
    // renderDailyWeather(daily)
    // renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}

function setValue(selector, value, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode){
    return `public/icons/${ICON_MAP.get(iconCode)}.svg`
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