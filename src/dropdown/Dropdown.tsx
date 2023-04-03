import React, { FC, useState, useRef, useEffect } from 'react';
import { DropdownDataType } from './Dropdown.types';
import './Dropdown.scss';

const Dropdown: FC<DropdownDataType> = ({
  data,
  placeholder,
  name
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searched = data.filter((option: any) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    searchTerm && setIsOpen(true);
  }, [searchTerm]);

  return (
    <div className='dropdown'>
      <div
        ref={dropdownRef}
        onClick={handleOpenDropdown}>
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className={`dropdown-menu ${isOpen? 'active' : ''}`}>
        {searchTerm ?
          searched.map((option: any) => (
            <li key={option.value}>
              {option.title}
            </li>
          ))
          :
          data.map((option: any) => (
            <li key={option.value}>
              {option.title}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Dropdown;
