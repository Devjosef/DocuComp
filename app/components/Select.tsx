import React from 'react';

interface SelectProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, selected, onChange }) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
