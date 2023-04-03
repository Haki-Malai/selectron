import React, { FC, useState, useRef, useEffect } from 'react';
import { DropdownDataType, DropdownItemDataType } from './Dropdown.types';
import { ReactComponent as ArrowIcon } from './icons/arrowIcon.svg';
import { ReactComponent as DeleteIcon } from './icons/deleteIcon.svg';
import { removeItemsFromArrayByValue } from './Dropdown.utils';
import NoDataComponent from './NoData.component';
import './Dropdown.scss';

const Dropdown: FC<DropdownDataType> = ({
  data,
  placeholder,
  error,
  onDropdownChange,
  name,
  testError = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(error)
  const [selectedOptions, setSelectedOptions] = useState<DropdownItemDataType[] | []>([]);
  const [filteredOptions, setFilteredOptions] = useState<DropdownItemDataType[] | []>(data);
  const [options, setOptions] = useState<DropdownItemDataType[] | []>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter the data based on the search term
  const searched = data.filter((option: any) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleOptionSelect = (option: DropdownItemDataType) => {
    // Add the selected option to the selectedOptions array
    const resultOptions = [...selectedOptions, option];
    setSelectedOptions(resultOptions);
    // Remove the selected option from the filteredOptions array
    const filteredResultOptions = removeItemsFromArrayByValue(data, resultOptions);
    setFilteredOptions(filteredResultOptions);
    setIsOpen(false);
    setErrorState(false);
    onDropdownChange(name, resultOptions);
    setSearchTerm('');
  }

  // Remove the selected item from the selectedOptions array
  const handleRemoveItemFromSelected = (itemToRemove: DropdownItemDataType) => {
    const selectedResultOptions = selectedOptions.filter(item => item.value !== itemToRemove.value);
    setSelectedOptions(selectedResultOptions);
    setFilteredOptions([itemToRemove, ...filteredOptions])
    onDropdownChange(name, selectedResultOptions);
  }

  // Close the dropdown when clicking outside of it 
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

  // Open the dropdown when the search term is not empty
  useEffect(() => {
    searchTerm && setIsOpen(true);
  }, [searchTerm]);

  // Test the error state
  useEffect(() => {
    if (testError) {
      setErrorState(true);
      setIsOpen(false);
      setSelectedOptions([]);
      setOptions(data);
    }
  }, [testError]);

  useEffect(() => {
    setOptions(searchTerm ? searched : filteredOptions);
  }, [searchTerm, filteredOptions]);

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
      <div className={'dropdown-selected-items'}>
        {selectedOptions.map(option =>
          <div key={option.value} className={`dropdown-selected-items-item`}
            onClick={() => handleRemoveItemFromSelected(option)}>
            <span>{option.title}</span>
            <DeleteIcon />
          </div>
        )}
      </div>
      <ul className={`dropdown-menu ${isOpen? 'active' : ''}`}>
        {options.length
          ? options.map(option => (
            <li key={option.value} className="dropdown-menu-item" onClick={() => handleOptionSelect(option)}>
              {option.title}
            </li>
          ))
          : <NoDataComponent />
        }
      </ul>
    </div>
  );
}

export default Dropdown;
