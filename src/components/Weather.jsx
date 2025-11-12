import React from 'react'
import './Weather.css'

import sunny from '../assets/sun.gif'
import cloudy from '../assets/cloudy.gif'
import rainy from '../assets/rain.gif'
import stormy from '../assets/wind.gif'
import snowy from '../assets/snowflake.gif'

export default function Weather() {
    return (
        <>
            <div className="main">
                <div className="weather">
                    <h1>Check Weather</h1>
                    <div className="input-box input-group mb-3">
                        <input type="text" className="input-field form-control" placeholder="Enter City Name" />
                        <button className="btn btn- btn-outline-secondary">🔍</button></div>
                    <div className="display">
                        {
                            <img src={sunny} alt="" className='weather-icon' />
                        }
                        <p className='temp'>16℃</p>
                        <p className='location'>London</p>
                    </div>
                </div>


            </div>
        </>
    )
}
