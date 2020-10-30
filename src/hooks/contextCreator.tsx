import React from "react";

function createUseCtx<ReturnValue>(context: React.Context<ReturnValue>) {
  return () => {
    return React.useContext<ReturnValue>(context);
  };
}

type Hook<Props, ReturnValue> = (props: Props) => ReturnValue;
export function createContext<Props, ReturnValue>(
  hook: Hook<Props, ReturnValue>,
  initialState: ReturnValue
) {
  const context = React.createContext<ReturnValue>(initialState);
  const useContext = createUseCtx(context);

  const Provider: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    const { Provider } = context;
    // Maybe Ryan knows? 🤔
    // https://github.com/microsoft/TypeScript/issues/35858#issuecomment-573909154
    const returnValue = hook(rest as Props);
    return <Provider value={returnValue}>{children}</Provider>;
  };

  return { Provider, useContext };
}
