import React from "react";
import { Search } from "lucide-react";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="relative flex items-center justify-center"> 
      <Search size={16} className="absolute left-3 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-9 pr-4 py-2 border rounded-md"
      />
    </div>
  );
};

export default SearchInput;
