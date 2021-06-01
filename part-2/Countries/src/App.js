import React, { useState, useEffect } from "react";
import axios from "axios";
import weather from "weather";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [filter, setFilter] = useState("");
  const [toShow, setToShow] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    axios.get("http://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setCountriesToShow(
        countries.filter((country) =>
          country.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setClick(true);
    };

    filter
      ? setToShow(
          countries
            .filter((country) =>
              country.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((country) => (
              <div key={country.numericCode}>
                {country.name}
                <Button handleClick={handleClick} value={country.name} />
              </div>
            ))
        )
      : setToShow(<p></p>);
  }, [countries, filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setClick(false);
  };

  const Button = (props) => {
    return (
      <>
        <button onClick={props.handleClick} value={props.value}>
          Show
        </button>
      </>
    );
  };

  const CountryInfo = ({ countries, filter }) => {
    const [countryList, setCountryList] = useState([]);
    const [capital, setCapital] = useState(null);
  
    useEffect(() => {
      setCountryList(
        countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }, [countries, filter]);
  
    useEffect(() => {
      if (countryList.length === 1) {
        setCapital(countryList[0].capital);
      }
    }, [countryList]);
  
    const country = countryList.map((country) => (
      <div key={country.numericCode}>
        <div>
          <h1>{country.name}</h1>
          <p>Capital {country.capital}</p>
          <p>Population {country.population}</p>
          <h1>Languages</h1>
          <ul>
            {country.languages.map((lang) => (
              <li key={lang.iso639_1}>{lang.name}</li>
            ))}
          </ul>
          <img style={{ width: "20%" }} src={country.flag} alt={country.name} />
        </div>
      </div>
    ));
  
    return (
      <>
        {country}
        {capital ? <Weather city={capital} /> : <p>Loading</p>}
      </>
    );
  }; 

  const List = ({ toShow, filter }) => {
    return (
      <div>
        {toShow.length < 10 || !filter
          ? toShow
          : "Too many matches, specify another filter"}
      </div>
    );
  };
  
  const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      let source = axios.CancelToken.source();
      axios
        .get("http://api.weatherstack.com/current", {
          params: {
            access_key: process.env.REACT_APP_API_KEY,
            query: city,
          },
          cancelToken: source.token,
        })
        .catch((error) => {
          console.log("Request canceled", error.message);
          throw error;
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setWeather(response.data);
          }
        })
        .catch((error) => {
          console.log(error.config);
        });
  
      return () => {
        source.cancel("Weather component is unmounting");
      };
    }, [city]);
    console.log(weather);
    if (weather && weather.current) {
      return (
        <div>
          <h1>Weather in {city}</h1>
          <p>
            <strong>Temperature:</strong> {weather.current.temperature} Celsius
          </p>
          <img src={weather.current.weather_icons[0]} alt="weather" />
          <p>
            <strong>Wind:</strong> {weather.current.wind_speed} km/h direction{" "}
            {weather.current.wind_dir}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };



  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        {click || toShow.length === 1 ? (
          <CountryInfo
            countries={toShow.length > 1 ? countriesToShow : countries}
            filter={filter}
          />
        ) : (
          <List toShow={toShow} filter={filter} />
        )}
      </div>
    </div>
  );
};

export default App;