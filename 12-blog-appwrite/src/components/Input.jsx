import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounder-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        type={type}
        placeholder={placeholder}
        {...props}
        id={id}
        ref={ref}
      />
    </div>
  );
});

export default Input;
