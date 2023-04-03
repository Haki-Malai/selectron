import React, { FC } from 'react';
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

  return (
    <div>
      <Dropdown data={cars} placeholder='Cars' error={false} name='cars_dropdown' />
    </div>
  );
}

export default App;
