import React from "react";

type DefaultProps = { optionalProp: number };
type Props = {
  requiredProp: "some_string" | "other_string";
} & DefaultProps;

export const BaseComponent = (props: Props) => {
  const { requiredProp, optionalProp } = props;
  return (
    <div>
      {requiredProp} {optionalProp}
    </div>
  );
};

BaseComponent.defaultProps = {
  optionalProp: 0,
} as Partial<DefaultProps>;

const comp = <BaseComponent requiredProp="some_string" />;
