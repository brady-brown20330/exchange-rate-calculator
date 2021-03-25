import React, { useEffect, useState } from "react";
import Dropdowns from "./components/Dropdowns";

const App = () => {

  return (
    <div className="app">
      <h1 className='header-one'>Support small to medium sized currencies</h1>
      <Dropdowns />
    </div>
  )
}

export default App;