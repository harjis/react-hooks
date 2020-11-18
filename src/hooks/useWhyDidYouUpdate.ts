import React from "react";

import usePrevious from "./usePrevious";

type Change = {
  from: unknown;
  to: unknown;
};
type Changes = { [key: string]: Change };
export const useWhyDidYouUpdate = <T extends Record<string, unknown>>(
  name: string,
  props: T
) => {
  const prevProps = usePrevious(props);

  React.useEffect(() => {
    const allKeys = Object.keys({ ...prevProps, ...props });
    const changes: Changes = {};
    allKeys.forEach((key) => {
      if (prevProps[key] !== props[key]) {
        changes[key] = {
          from: prevProps[key],
          to: props[key],
        };
      }
    });

    if (Object.keys(changes).length) {
      console.log("[why-did-you-update]", name, changes);
    }
  });
};
