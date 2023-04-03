import React, { FC, useState } from 'react';
import Dropdown from './dropdown';

interface CarType {
  title: string;
  value: string;
}

const App: FC = () => {
  const cars: CarType[] = [
    {title: "Toyota", value: "toyota"},
    {title: "Honda", value: "honda"},
    {title: "Ford", value: "ford"},
    {title: "Chevrolet", value: "chevrolet"},
    {title: "Nissan", value: "nissan"},
    {title: "BMW", value: "bmw"},
    {title: "Audi", value: "audi"},
    {title: "Tesla", value: "tesla"}
  ];
  const [error, setError] = useState<boolean>(false);

  return (
    <div>
      <Dropdown data={cars} placeholder='Cars' error={error} name='cars_dropdown' />
      <button onClick={() => setError(!error)}>Error Test</button>
    </div>
  );
}

export default App;
