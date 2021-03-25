import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeSeries = (props) => {
const [historicalRates, setHistoricalRates] = useState({});

useEffect(() => {
  axios.get(`${props.host}/2020-01-01..2020-01-31?to=USD`)
  .then(data => setHistoricalRates(data.data))
}, [])

if (!historicalRates.amount) {
  return (
    <div>Historical Rates</div>
  )
}

return (
  <pre>
    {Object.keys(historicalRates.rates)}
  </pre>
)
}

export default TimeSeries;
