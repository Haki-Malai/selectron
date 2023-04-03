import React, { FC, useState } from 'react';
import { DropdownDataType } from './Dropdown.types';
import './Dropdown.scss';

const Dropdown: FC<DropdownDataType> = ({
  data,
  placeholder,
  name
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='dropdown'>
      <button onClick={handleOpenDropdown}>{placeholder}</button>
      <ul className={`dropdown-menu ${isOpen? 'active' : ''}`}>
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
