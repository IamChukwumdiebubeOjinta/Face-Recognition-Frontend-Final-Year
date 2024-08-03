import React, { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface StyledInputProps {
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  required: boolean;
  labelColor?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  type,
  label,
  register,
  required,
  labelColor = "#e0e9f3",
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    register.onChange = (e) => setValue(e.target.value);
  }, [register]);

  return (
    <div className="relative w-[80%] rounded-lg my-2 bg-white styled-input md:my-4">
      <input
        type={type}
        required={required}
        {...register}
        value={value}
        onChange={(e) => {
          register.onChange(e);
          setValue(e.target.value);
        }}
        className="w-full px-4 py-2 text-base bg-transparent border-0 focus:outline-none"
      />
      <label
        className={`absolute top-0 left-0 p-2 text-gray-500 transition-all pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 origin-[0] peer-focus:start-0`}
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 block w-0 h-[3px] bg-[#445a63] transition-all"></span>
      <style jsx="true">{`
        input:valid ~ label,
        input:focus ~ label {
          top: -1.7rem;
          font-size: 0.75em;
          color: ${labelColor};
        }
        input:focus ~ span {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default StyledInput;
