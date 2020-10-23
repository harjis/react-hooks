import React, { createContext } from "react";

type ReturnType = {
  counter: number;
  inc: () => void;
  dec: () => void;
};
const initialState: ReturnType = {
  counter: 0,
  inc: () => {
    throw new Error("Implement inc");
  },
  dec: () => {
    throw new Error("Implement dec");
  },
};

function useCounter(): ReturnType {
  const [counter, setCounter] = React.useState(initialState.counter);

  const inc = () => setCounter((prevState) => prevState + 1);
  const dec = () => setCounter((prevState) => prevState - 1);

  return { counter, inc, dec };
}

const store = createContext<ReturnType>(initialState);
const { Provider } = store;

const CounterProvider: React.FC = (props) => {
  const counter = useCounter();
  return <Provider value={counter}>{props.children}</Provider>;
};

export { store, CounterProvider };
