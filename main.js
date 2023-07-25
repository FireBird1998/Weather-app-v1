import "./style.css"
import { getWeather } from "./weather"

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



function renderCurrentWeather(current){
    document.querySelector("[data-current-temp]").textContent = current.currentTemp
}