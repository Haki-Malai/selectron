import React, { FC } from 'react';
import { DropdownDataType } from './Dropdown.types';

const Dropdown: FC<DropdownDataType> = ({
  data,
  placeholder,
  name
}) => {

  return (
    <div>
      <label>{placeholder}</label>
      <ul>
        {data.map(({ title }, index: number) => {
          return (
            <li key={index}>
              <button onClick={() => console.log('Clicked:', title)}>{title}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
