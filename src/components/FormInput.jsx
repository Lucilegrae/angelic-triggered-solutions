import React from "react";

export default function FormInput({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  textarea = false 
}) {
  if (textarea) {
    return (
      <textarea
        className="aura-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
  return (
    <input
      className="aura-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
