/* https://open-meteo.com/en/docs#latitude=22.6547&longitude=88.4467&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&precipitation_unit=inch&timezone=GMT*/


import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
/**importing the Axios library using the ES6 import statement. Axios is a popular JavaScript library used for making HTTP requests. */




/**getWeather Function:
This function takes three parameters: lat (latitude), lon (longitude), and timezone. It makes an HTTP GET request to the Open Meteo API, passing the latitude, longitude, and timezone as query parameters. */
export function getWeather(lat, lon, timezone){

    /**Axios GET Request:
    The Axios get method is used to make the HTTP GET request to the API. The API URL and query parameters are specified as arguments to the method. */


    return axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&precipitation_unit=inch", {
            params:{
                latitude: lat,
                longitude: lon,
                timezone,
            },
        }
    ) //this is the transition point, IF we get the data from the api call above THEN we are parcing the data.
    .then(({data}) => {
        // Loging the data to the console
        console.log("API Response Data:", data);
        
        return{
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
        /* Parsing the Response Data:
            The function uses destructuring to extract relevant data from the API response. 
            It then calls three helper functions (parseCurrentWeather, parseDailyWeather, and parseHourlyWeather) to process the response data and extract specific information.*/ 
    })
}

/** Helper Functions:

parseCurrentWeather: This function takes an object containing the current weather data and the daily weather data. It extracts relevant information such as current temperature, wind speed, weather code, etc. It returns an object containing the parsed data.

parseDailyWeather: This function takes an object containing the daily weather data and returns an array of objects, each representing the weather for a specific day. It includes information like timestamp, weather code, and maximum temperature for each day.

parseHourlyWeather: This function takes an object containing the hourly weather data and the current weather data. It returns an array of objects, each representing the weather for a specific hour. It includes information like timestamp, weather code, temperature, feels like temperature, wind speed, and precipitation for each hour. It filters out the data for past hours using the current weather time. */


function parseCurrentWeather({current_weather, daily}){
    const { 
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode
    } = current_weather

    const{
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],

    } = daily



   return{
    currentTemp: Math.round(currentTemp), 
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,

   } 
}

function parseDailyWeather({daily}){
    return daily.time.map((time, index) => {
        return {
            timestamp: time,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}

function parseHourlyWeather({hourly, current_weather}) {
    return hourly.time.map((time, index) => {
        return{
            timestamp : time,
            iconCode: hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100,

        }
    }).filter(({timestamp}) => timestamp >= current_weather.time)
}