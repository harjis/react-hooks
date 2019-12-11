import React from 'react';

type ReturnType = {
  counter: number;
  inc: () => void;
  dec: () => void;
};
export default function useCounter(): ReturnType {
  const [counter, setCounter] = React.useState(0);

  const inc = () => setCounter(prevState => prevState + 1);
  const dec = () => setCounter(prevState => prevState - 1);

  return { counter, inc, dec };
}
