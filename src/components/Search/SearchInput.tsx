import React from "react";

type Props = {
  onSearch: (search: string) => void;
  value: string;
};
export const SearchInput: React.FC<Props> = (props) => (
  <input
    type="text"
    onChange={(event) => {
      const value = event.currentTarget.value;
      props.onSearch(value);
    }}
    value={props.value}
  />
);
