import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdowns = (props) => {
const [currencyOptions, setCurrenctOptions] = useState({});
const [current1, setCurrent1] = useState('')
const [current2, setCurrent2] = useState('')

  useEffect(() => {
    axios.get(`https://api.frankfurter.app/currencies`)
    .then(data => setCurrenctOptions(data.data))
  }, [])

const handleDropdownChange = (e) => {
  console.log(e.target.value)
}

const getComparisonData = () => {
  
}

if (currencyOptions.length < 1) {
  return (
    <div>Loading</div>
  )
}
console.log(Object.values(currencyOptions))
return (
  <div style={{display: 'inline'}}>
    <select value={current1} onChange={handleDropdownChange}>
      <option selected="selected">test</option>
      {Object.keys(currencyOptions).map((place) => {
        return (
          <option key={place} value={place}>{place}</option>
        )
      })}
    </select>

    <select value={current2} onChange={handleDropdownChange}>
      <option selected="selected">test</option>
      {Object.keys(currencyOptions).map((place) => {
        return (
          <option key={place} value={place}>{place}</option>
        )
      })}
    </select>

    <button onClick={getComparisonData}>Compare</button>
  </div>
)
}

export default Dropdowns;