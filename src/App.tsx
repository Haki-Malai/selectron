import React from 'react';
import Dropdown from './dropdown';


function App() {
  const cars = [
    {title: "Toyota", value: "toyota"},
    {title: "Honda", value: "honda"},
    {title: "Ford", value: "ford"},
    {title: "Chevrolet", value: "chevrolet"},
    {title: "Nissan", value: "nissan"},
    {title: "BMW", value: "bmw"},
    {title: "Audi", value: "audi"},
    {title: "Tesla", value: "tesla"}
  ];

  return (
    <div>
        <Dropdown items={cars} />
    </div>
  );
}

export default App;
