import { useEffect, useState } from "react";
import axios from "axios";
import {
  thunderstormSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  atmosphereSvg,
  clearSvg,
  cloudSvg,
} from "./assets/img";
import Card from "./components/card";
import CitySearch from "./components/city-search";
import "./assets/CSS/index.css";
import "./assets/CSS/App.css";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button";
import "@material/web/checkbox/checkbox";

const key = "16b20bd766dddf77d9f663f38f3df88c";
const url = "https://api.openweathermap.org/data/2.5/weather";

const initialState = {
  latitude: 0,
  longitude: 0,
};

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804],
};

const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg,
};

function App() {
  const [coords, setCoords] = useState(initialState);
  const [weather, setWeather] = useState({});
  const [toggle, setToggle] = useState(false);
  const [city, setCity] = useState("");

  const fetchWeatherByCity = (cityName) => {
    axios
      .get(`${url}?q=${cityName}&appid=${key}`)
      .then((res) => {
        updateWeatherState(res);
      })
      .catch((err) => {
        console.error("City not found", err);
      });
  };

  const fetchWeatherByCoords = () => {
    axios
      .get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
      .then((res) => {
        updateWeatherState(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateWeatherState = (res) => {
    const keys = Object.keys(conditionCodes);
    const iconName = keys.find((key) =>
      conditionCodes[key].includes(res.data?.weather[0]?.id)
    );
    setWeather({
      city: res.data?.name,
      country: res.data?.sys?.country,
      icon: icons[iconName],
      main: res.data?.weather[0]?.main,
      wind: res.data?.wind?.speed,
      clouds: res.data?.clouds?.all,
      pressure: res.data?.main?.pressure,
      temperature: parseInt(res.data?.main?.temp - 273.15),
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        console.log("You need to accept the permissions to continue");
      }
    );
  }, []);

  {
  }
  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      fetchWeatherByCoords();
    }
  }, [coords]);

  return (
    <div className="container">
      <Card weather={weather} toggle={toggle} setToggle={setToggle} />
      <CitySearch onSearch={fetchWeatherByCity} />
    </div>
  );
}

export default App;
