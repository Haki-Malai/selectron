import React, { FC, useState } from 'react';
import Dropdown from './dropdown';
import { DropdownItemDataType } from './dropdown/Dropdown.types';

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

  // Used to get the selected items from the dropdown
  const handleDropdownChange = (name: string, selectedItems: DropdownItemDataType[]) => {
    const resultObj = {
      [name]: selectedItems
    }
  }

  return (
    <div>
      <Dropdown
        data={cars}
        placeholder='Cars'
        error={false}
        onDropdownChange={handleDropdownChange}
        name='cars_dropdown'
        testError={error}
      />
      <button style={{ marginTop: '5rem'}} onClick={() => setError(!error)}>Error Test</button>
    </div>
  );
}

export default App;
