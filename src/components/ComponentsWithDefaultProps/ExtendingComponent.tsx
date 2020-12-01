import React from "react";

import { BaseComponent } from "./BaseComponent";

type DefaultProps = { optionalProp: number };
type Props = {
  requiredProp: "some_string" | "other_string";
} & DefaultProps;

export const ExtendingComponent = (props: React.PropsWithChildren<Props>) => {
  return (
    <div>
      <BaseComponent requiredProp="some_string" />
    </div>
  );
};

ExtendingComponent.defaultProps = {
  ...BaseComponent.defaultProps,
} as Partial<DefaultProps>;

const comp = <ExtendingComponent requiredProp="some_string" />;
