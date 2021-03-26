import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Axis from '@visx/axis'

const TimeSeries = (props) => {
const [historicalRates, setHistoricalRates] = useState({});

useEffect(() => {
  axios.get(`${props.host}/2020-01-01..2020-01-31?to=USD`)
  .then(data => {
    setHistoricalRates(data.data)
    console.log('timeseries: ', data.data)
  })
}, [])

if (!historicalRates.amount) {
  return (
    <div>Historical Rates</div>
  )
}

return (
  <div>
    <div>
    {Object.keys(historicalRates.rates)}
  </div>
  Graph goes here
  </div>
)
}

export default TimeSeries;
