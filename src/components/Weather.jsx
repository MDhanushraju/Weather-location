import React, { useEffect, useRef, useState, } from 'react'
import './Weather.css'

import sunny from '../assets/sun.gif'
import cloudy from '../assets/cloudy.gif'
import rainy from '../assets/rain.gif'
import wind from '../assets/wind.gif'
import snowy from '../assets/snow.gif'
import hum from '../assets/hum.gif'

export default function Weather() {
    let [city,setCity]=useState("Bangalore");
    const [weatherdata, setWeatherdata] = useState(null);
    const allicons = {
        "01d": sunny,
        "01n": sunny,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": wind,
        "04n": wind,
        "09d": rainy,
        "09n": rainy,
        "10d": rainy,
        "10n": rainy,
        "13d": snowy,
        "13n": snowy,
    };
    async function search(cityN) {
       if(cityN==""){
        alert("Please enter a city name");
        return;
       }
        try {
            const apikey = "16b2b09d2874d62b661b7185c2671c22";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&units=metric&appid=${apikey}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                const icon = allicons[data.weather[0].icon] || sunny;
                setWeatherdata({
                    humidity: data.main.humidity,
                    windspeed: data.wind.speed,
                    temp: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                })
            } else {
                const errData = await res.json();
                console.error("API error:", errData);
                setWeatherdata(null);
            }


        } catch (error) {
            console.error("Network error:", error);
        }

    }

    useEffect(() => {
        search("pune");
    }, [])

    return (
        <>
            <div className="main">
                <div className="weather">
                    <h1>Check Weather</h1>
                    <div className="input-box input-group mb-3">
                        <input type="text"  className="input-field form-control" placeholder="Enter City Name" onChange={(e)=>setCity(e.target.value)} />
                        <button className="btn btn- btn-outline-secondary" onClick={() => { search(city) }}>🔍</button></div>
                    <div className="display">

                        {weatherdata ? (
    <>
      <img src={weatherdata.icon} alt="" className='weather-icon' />
      <p className='temp'>{weatherdata.temp}℃</p>
      <p className='location'>{weatherdata.location}</p>
      <div className="weather-data">
        <div className="col-1">
          <img src={hum} alt="" className='hum-icon' />
          <div>
            <p>{weatherdata.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col-2">
          <img src={wind} alt="" className='wind-icon' />
          <div>
            <p>{weatherdata.windspeed}</p>
            <span>WindSpeed</span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading or no data available</p>
  )}
 
                    </div>
                </div>


            </div>
        </>
    )
}
