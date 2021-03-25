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

// gets the object containing all countries names
useEffect(() => {
  axios.get(`${host}/currencies`)
  .then(data => setCurrenctOptions(data.data))
}, [])

// handles the dropdown changing based on the select className
const handleDropdownChange = (e) => {
  if (e.target.className == 'from-select') setconvertFrom(e.target.value)
  else if (e.target.className == 'to-select') setConvertTo(e.target.value)
}

const handleAmountChange = (e) => {
  setAmount(e.target.value)
}

// gets conversion info using dropdown inputs
const getComparisonData = () => {
  if (convertFrom == convertTo) {
    alert(`Cannot convert ${convertFrom} to ${convertTo}...`)
  }
  axios.get(`${host}/latest?amount=${amount > 0 ? amount : 1}&from=${convertFrom}&to=${convertTo}`)
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
      <div>Select an amount:</div>
      <input onChange={handleAmountChange}></input>

      <div>Convert From:</div>
      <select className='from-select' value={convertFrom} onChange={handleDropdownChange}>
        <option selected="selected"></option>
        {Object.keys(currencyOptions).map((place) => {
          return (
            <option key={place} value={place}>{place}</option>
          )
        })}
      </select>

      <div>To:</div>
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
    <h1>{conversionData.date ? `As of ${conversionData.date} ${conversionData.amount} ${conversionData.base} is equal to ${Object.values(conversionData.rates)[0]} ${Object.keys(conversionData.rates)[0]}` : null}</h1>
  </div>
)
}

export default Dropdowns;