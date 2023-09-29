import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="city-search">
      <input
       className="city-input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    </div>
  );
}

export default SearchInput;

