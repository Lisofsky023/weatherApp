// import React from 'react';

// export default function SearchInput({ value, onChange, placeholder }) {
//   return (
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//     />
//   );
// }
import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default SearchInput;
