import React from 'react';

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
    <div className="App">
      <header className="App-header">
        {cars.map((car) => <h1>{car.title}</h1>)}
      </header>
    </div>
  );
}

export default App;
