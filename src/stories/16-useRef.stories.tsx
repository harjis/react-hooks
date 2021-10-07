import React, { useEffect, useState } from "react";
import { Story } from "@storybook/react";

export default {
  title: "RefObject & RefCallback",
};

export const RefObject: Story = () => {
  const [renderBlue, setRenderBlue] = useState(true);
  const [ref, dimensions] = useResizeObserverRefObject<HTMLDivElement>();
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 500 }}>
      <div>
        <button onClick={() => setRenderBlue(!renderBlue)}>
          {renderBlue ? "Render red" : "Render blue"}
        </button>
        Ref div dimensions: height: {dimensions.height} width:{" "}
        {dimensions.width}
      </div>
      {renderBlue ? (
        <BlueDiv instanceRef={ref} height={100} width={100} />
      ) : (
        <RedDiv instanceRef={ref} height={200} width={200} />
      )}
    </div>
  );
};
RefObject.storyName = "RefObject";

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.RefObject<ElementType>, Dimensions];
const useResizeObserverRefObject = <
  ElementType extends Element
>(): ReturnType<ElementType> => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const ref = React.useRef<ElementType>(null);

  React.useEffect(() => {
    const { current } = ref;
    const observer = new ResizeObserver(([element]) => {
      // https://alligator.io/js/resize-observer/
      // Unlike with an element’s getBoundingClientRect, contentRect’s values for width and height don’t
      // include padding values. contentRect.top is the element’s top padding
      // and contentRect.left is the element’s left padding.
      const width = element.contentRect.left + element.contentRect.right;
      const height = element.contentRect.top + element.contentRect.bottom;

      setDimensions({ height, width });
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [ref, dimensions];
};

type DivProps = {
  instanceRef: React.Ref<HTMLDivElement>;
  height: number;
  width: number;
};
function BlueDiv(props: DivProps) {
  const { height, width, instanceRef } = props;
  return (
    <div
      ref={instanceRef}
      style={{ backgroundColor: "lightblue", height, width }}
    />
  );
}

function RedDiv(props: DivProps) {
  const { height, width, instanceRef } = props;
  return (
    <div
      ref={instanceRef}
      style={{ backgroundColor: "lightpink", height, width }}
    />
  );
}
