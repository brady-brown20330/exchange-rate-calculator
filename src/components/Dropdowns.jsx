import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeSeries from './TimeSeries';


const Dropdowns = (props) => {
const [currencyOptions, setCurrenctOptions] = useState({});
const [amount, setAmount] = useState(0)
const [convertFrom, setConvertFrom] = useState('')
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
  if (e.target.className == 'from-select') {
    setConvertFrom(getKeyByValue(currencyOptions, e.target.value))
  }
  else if (e.target.className == 'to-select') {
    setConvertTo(getKeyByValue(currencyOptions, e.target.value))
  }
}

// handles the amount input field
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

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

if (currencyOptions.length < 1) {
  return (
    <div>Loading</div>
  )
}

return (
  <div>
    <form className='form-wrapper' onClick={function(event) {event.preventDefault()}}>
      <div className='amount-wrapper'>
        <div>Select an amount:</div>
        <input className='amount-input' onChange={handleAmountChange}></input>
      </div>


      <div className='from-wrapper'>
        <div>Convert From:</div>
        <select className='from-select' defaultValue={convertFrom} onChange={handleDropdownChange}>
          <option></option>
          {Object.values(currencyOptions).map((place) => {
            return (
              <option key={place}>{place}</option>
            )
          })}
        </select>
      </div>

      <div className='to-wrapper'>
        <div>To:</div>
        <select className='to-select' defaultValue={convertTo} onChange={handleDropdownChange}>
          <option></option>
          {Object.values(currencyOptions).map((place) => {
            return (
              <option key={place}>{place}</option>
            )
          })}
        </select>
      </div>

      <button className='convert-button' onClick={getComparisonData}>Compare</button>
    </form>
    <h1 className='header-one'>{conversionData.date ? `As of ${conversionData.date} ${conversionData.amount} ${conversionData.base} is equal to ${Object.values(conversionData.rates)[0]} ${Object.keys(conversionData.rates)[0]}` : null}</h1>
    <TimeSeries host={host} convertTo={convertTo}/>
  </div>
)
}

export default Dropdowns;