import constate from "constate";
import useCounter from "../../../hooks/useCounter";

const [CounterProvider, useCounterContext] = constate(useCounter);

export { CounterProvider, useCounterContext };
