function Card({ weather, toggle, setToggle }) {
  const temp = !toggle
    ? parseInt((weather.temperature * 9) / 5 + 32)
    : weather.temperature;

  return (
    <div className="card">
      <img className="card__header" src="/public/bg.jpg" alt="header" />
      <div className="card__footer">
        <p className="card__title">The Weather App</p>
        <h2 className="card__subtitle">
          {weather.city}, {weather.country}
        </h2>
        <div className="card__body">
          <h3 className="card__main">"{weather.main}"</h3>

          <div className="card__content">
            <img src={weather.icon} alt={weather.main} width={100} />
            <div className="card__info">
              <p className="card__wind-speed">Wind Speed: {weather.wind} m/s</p>
              <p className="card__clouds">Clouds: {weather.clouds}%</p>
              <p className="card__pressure">Pressure: {weather.pressure} hPa</p>
            </div>
          </div>

          <h2 className="card__temperature">
            {temp} {toggle ? "°C" : "F°"}
          </h2>
        </div>

        <button variant="contained" onClick={() => setToggle(!toggle)}>
          Change to {toggle ? "Farenheit" : "Celsius"}
        </button>
      </div>
    </div>
  );
}
export default Card;
