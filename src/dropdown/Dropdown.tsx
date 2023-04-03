import React, { FC, useState, useRef, useEffect } from 'react';
import { DropdownDataType } from './Dropdown.types';
import { ReactComponent as ArrowIcon } from './icons/arrowIcon.svg';
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
    const handleClickOutside = (event: MouseEvent) => {
      const clickedItem = event.target as HTMLElement;
      const isDropdownItemClicked = clickedItem.classList.contains('dropdown-menu-item');
      if (
        !isDropdownItemClicked &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  useEffect(() => {
    searchTerm && setIsOpen(true);
  }, [searchTerm]);

  return (
    <div className='dropdown'>
      <div
        className={`dropdown-toggle`}
        ref={dropdownRef}
        onClick={handleOpenDropdown}>
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className={`dropdown-toggle-arrow ${isOpen? 'active': ''}`}>
          <ArrowIcon />
        </span>
      </div>
      <ul className={`dropdown-menu ${isOpen? 'active' : ''}`}>
        {searchTerm ?
          searched.map((option: any) => (
            <li className={'dropdown-menu-item'} key={option.value}>
              {option.title}
            </li>
          ))
          :
          data.map((option: any) => (
            <li className={'dropdown-menu-item'} key={option.value}>
              {option.title}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Dropdown;
