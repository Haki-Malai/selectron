import { DropdownItemDataType } from "./Dropdown.types";

export const removeItemsFromArrayByValue = (
    arr1: DropdownItemDataType[],
    arr2: DropdownItemDataType[]
  ): DropdownItemDataType[] => {
  const valuesToRemove = arr2.map((item) => item.value);
  return arr1.filter((item) => !valuesToRemove.includes(item.value));
};
