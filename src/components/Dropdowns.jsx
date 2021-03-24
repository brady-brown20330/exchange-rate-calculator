import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdowns = (props) => {
const [currencyOptions, setCurrenctOptions] = useState({});
const [amount, setAmount] = useState(0)
const [convertFrom, setconvertFrom] = useState('')
const [convertTo, setConvertTo] = useState('')
const [conversionData, setConversionData] = useState({})

// base url from frakfurter API
const host = 'https://api.frankfurter.app'

  useEffect(() => {
    axios.get(`${host}/currencies`)
    .then(data => setCurrenctOptions(data.data))
  }, [])

const handleDropdownChange = (e) => {
  if (e.target.className == 'from-select') setconvertFrom(e.target.value)

  else if (e.target.className == 'to-select') setConvertTo(e.target.value)
}

const getComparisonData = () => {
  axios.get(`${host}/latest?amount=1&from=${convertFrom}&to=${convertTo}`)
  .then(data => {
    setConversionData(data.data)  
      console.log(data.data)
    })
}

if (currencyOptions.length < 1) {
  return (
    <div>Loading</div>
  )
}

return (
  <div>
    <div style={{display: 'inline'}}>
      <select className='from-select' value={convertFrom} onChange={handleDropdownChange}>
        <option selected="selected"></option>
        {Object.keys(currencyOptions).map((place) => {
          return (
            <option key={place} value={place}>{place}</option>
          )
        })}
      </select>

      <select className='to-select' value={convertTo} onChange={handleDropdownChange}>
        <option selected="selected"></option>
        {Object.keys(currencyOptions).map((place) => {
          return (
            <option key={place} value={place}>{place}</option>
          )
        })}
      </select>

      <button onClick={getComparisonData}>Compare</button>
    </div>
    <h1>{conversionData.date ? `As of ${conversionData.date} ${conversionData.amount} ${conversionData.base} is equal to ${conversionData.rates[convertTo]} ${convertTo}` : null}</h1>
  </div>
)
}

export default Dropdowns;