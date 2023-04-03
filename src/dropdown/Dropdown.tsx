import React, { FC, useState, useRef, useEffect } from 'react';
import { DropdownDataType } from './Dropdown.types';
import { ReactComponent as ArrowIcon } from './icons/arrowIcon.svg';
import NoDataComponent from './NoData.component';
import './Dropdown.scss';

const Dropdown: FC<DropdownDataType> = ({
  data,
  placeholder,
  error,
  name
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(error)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searched = data.filter((option: any) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) setErrorState(false);
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
  }, [dropdownRef]);

  useEffect(() => {
    searchTerm && setIsOpen(true);
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) setErrorState(error);
  }, [error]);

  return (
    <div className='dropdown'>
      <div
        className={`dropdown-toggle ${errorState ? 'empty-data' : ''}`}
        ref={dropdownRef}
        onClick={handleOpenDropdown}>
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {errorState &&
          <p className={`error-label`}>
            Required field
          </p>
        }
        <p className={`label ${isOpen ? 'active' : ''}`}>
          {placeholder}
        </p>
        <span className={`dropdown-toggle-arrow ${isOpen? 'active': ''}`}>
          <ArrowIcon />
        </span>
      </div>
      <ul className={`dropdown-menu ${isOpen? 'active' : ''}`}>
        {searchTerm ?
          searched[0] ?
            searched.map((option: any) => (
              <li className={'dropdown-menu-item'} key={option.value}>
                {option.title}
              </li>
            ))
            :
            <NoDataComponent />
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
