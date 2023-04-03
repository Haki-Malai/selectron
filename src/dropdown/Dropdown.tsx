import React, {FC, useState} from 'react';

interface DropdownProps {
  items: { title: string }[];
}

const Dropdown: FC<DropdownProps> = ({items}) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;