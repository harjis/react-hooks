import React, { useRef } from "react";

export const ButtonAndInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnInput = () => {
    inputRef.current && inputRef.current.focus();
  };
  return (
    <div>
      <button role="button" onClick={focusOnInput}>
        Click to focus on input
      </button>
      <input ref={inputRef} type="text" role="input" />
    </div>
  );
};
