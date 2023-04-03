export interface DropdownItemDataType {
    title: string,
    value: string
}

export interface DropdownDataType {
    data: DropdownItemDataType[] | [],
    placeholder: string,
    error: boolean,
    name: string
}
