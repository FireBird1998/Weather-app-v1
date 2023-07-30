# Weather App

The Weather App is a simple web application that allows users to get real-time weather information based on their current geolocation. It provides a clean and intuitive user interface to display the current weather, daily forecast, and hourly forecast.

## Tech Stack

The Weather App is built using the following technologies and libraries:

- JavaScript (ES6+)
- Vite.js (Version 4.4.7)
- Axios (Version 1.4.0)

## Features

- Get real-time weather information based on the user's geolocation.
- Display the current weather, including temperature, feels-like temperature, wind speed, and precipitation.
- Show the daily weather forecast with maximum temperature and weather icons for each day.
- Provide an hourly weather forecast with temperature, feels-like temperature, wind speed, and precipitation for each hour.

## Live Web App

You can access the live web app here: [Weather App Live](https://firebird1998.github.io/Weather-app-v1/)

## How to Use

To use the Weather App, follow these steps:

1. Clone the repository to your local machine using the following command:

   ```
   git clone https://github.com/FireBird1998/Weather-app-v1.git
   ```

2. Install the project dependencies using npm or yarn:

   ```
   cd weather-app
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your web browser and navigate to `http://localhost:3000`. The app will automatically request access to your geolocation. Grant the permission to see the weather information.

## Folder Structure

The project follows the following folder structure:

- `public`: Contains the public assets, including icons and template files.
- `src`: Contains the JavaScript code for the Weather App.
  - `Js`: Contains utility functions and constants used in the app.
  - `components`: Contains reusable UI components.
- `index.html`: The main HTML file that loads the app.
- `package.json`: Defines project dependencies and scripts.

## Contributions

Contributions to the Weather App are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

The Weather App uses the [Open Meteo API](https://open-meteo.com/) to retrieve weather data. Special thanks to the contributors of the Vite.js and Axios libraries for their valuable open-source contributions.

---

