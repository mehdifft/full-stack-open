import axios from "axios"
import { useEffect, useState } from "react"

const Info = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_KEY
    const weatherInfoUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const imgUrl = 'https://openweathermap.org/img/wn/'

    useEffect(() => {
        axios
            .get(`${weatherInfoUrl}?q=${country.capital},${country.tld[0].slice(1)}&APPID=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    if (weather)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div>
                <div>Area {country.area}</div>

                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <div>
                    <img src={country.flags.png} alt={country.flags.alt} />
                </div>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature {Math.round((weather.main.temp - 273.15) * 1000) / 1000} Celsius</p>
                <img src={`${imgUrl}${weather.weather[0].icon}@2x.png`} alt={weather.weather.description} />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        )
    else
        return (
            <>
            </>
        )
}

export default Info